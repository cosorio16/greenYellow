import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Filler,
  Legend,
  Tooltip,
  LineController,
  Title,
  BarController,
  TimeScale,
  Decimation,
  scales,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";
import chartGenerator from "../utils/chartGenerator.js";
import { getDataDB } from "../utils/influxDB.js";

ChartJS.register(
  LinearScale,
  Decimation,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Filler,
  Title,
  Legend,
  Tooltip,
  LineController,
  BarController,
  TimeScale,
  zoomPlugin,
  scales
);

import useData from "../store/dataState.js";
import { useState, useEffect, useRef, useMemo } from "react";
import trends from "../data/trends.js";

function Voltajes() {
  const chartRef = useRef(null);
  const { floor } = useData();

  const [dataLoaded, setDataLoaded] = useState(null);

  const [voltajes, setVoltajes] = useState([1, 2, 3, 4, 5, 6, 5]);
  const [voltajes2, setVoltajes2] = useState([3, 4, 5, 6, 7, 8]);
  const [voltajes3, setVoltajes3] = useState([9, 3, 4, 5, 4, 2]);

  const piso5 = ["1/0/1", "1/0/11", "1/0/21"];
  const piso7 = ["1/0/3", "1/0/13", "1/0/23"];

  const [pisoSelected, setPisoSelected] = useState(floor == 5 ? piso5 : piso7);

  useEffect(() => {
    setPisoSelected(floor == 5 ? piso5 : piso7);
  }, [floor]);

  const [showDays, setShoDays] = useState(false);
  const [selectedOption, setSelectedOption] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [fechaStart, setFechaStart] = useState(currentDate);

  const week = ["D", "L", "M", "M", "J", "V", "S"];
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const [selected, setSelected] = useState([{}]);
  const [isSelected, setIsSelected] = useState(false);
  const [start, setStart] = useState(null);
  const [resolution, setResolution] = useState(5);

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const desfase = new Date(year, month, 1).getDay();

  useEffect(() => {
    setSelected([
      {
        year: currentDate.getFullYear(),
        mes: currentDate.getMonth(),
        dia: currentDate.getDate(),
      },
    ]);
  }, []);

  const calendar = useMemo(() => {
    const days = [];

    for (let i = -desfase + 1; days.length < 42; i++) {
      days.push({
        dia: new Date(year, month, i).getDate(),
        mes: new Date(year, month, i).getMonth(),
        year: new Date(year, month, i).getFullYear(),
      });
    }

    return days;
  }, [month, year]);

  const handleNextMonth = () => {
    const date = new Date(currentDate);
    date.setMonth(currentDate.getMonth() + 1);
    setCurrentDate(date);
  };

  const handleBackMonth = () => {
    const date = new Date(currentDate);
    date.setMonth(currentDate.getMonth() - 1);
    setCurrentDate(date);
  };

  const handleSetMonth = (i) => {
    const date = new Date(currentDate);
    date.setMonth(i);
    setCurrentDate(date);
  };

  const handleMouseDown = (date) => {
    setIsSelected(true);
    setStart(date);
    setSelected([date]);
  };

  const handleMouseEnter = (date) => {
    if (isSelected && start) {
      const range = [start, date].sort((a, b) => {
        if (a.year !== b.year) return a.year - b.year;
        if (a.mes !== b.mes) return a.mes - b.mes;
        return a.dia - b.dia;
      });

      const datesSelecteds = [];
      let current = new Date(range[0].year, range[0].mes, range[0].dia);
      const end = new Date(range[1].year, range[1].mes, range[1].dia);

      while (current <= end) {
        datesSelecteds.push({
          year: current.getFullYear(),
          mes: current.getMonth(),
          dia: current.getDate(),
        });
        current.setDate(current.getDate() + 1);
      }

      setSelected(datesSelecteds);
    }
  };

  const handleMouseUp = () => {
    setIsSelected(false);
    setShoDays(false);

    if (selected.length > 0) {
      const firstDate = selected[0];
      const newDate = new Date(firstDate.year, firstDate.mes, firstDate.dia);
      setCurrentDate(newDate);
    }
  };

  const handleIsSelected = (date) => {
    return selected.some(
      (selected) =>
        selected.year === date.year &&
        selected.mes === date.mes &&
        selected.dia === date.dia
    );
  };

  useEffect(() => {
    const date = `${selected[0]?.year}-${selected[0]?.mes + 1}-${
      selected[0]?.dia < 10 ? `0${selected[0]?.dia}` : `${selected[0]?.dia}`
    } 00:00:00`;

    setResolution(selected.length > 1 ? 60 : 5);
    setFechaStart(date);
  }, [selected]);

  const getMeterData = async (gp) => {
    const id = trends.filter((t) => t.object == localbus.encodega(gp))[0].id;

    const bodyData = {
      resolution: resolution * 60,
      dates_curr: {
        start: {
          year: selected[0]?.year,
          day: selected[0]?.dia,
          month: selected[0]?.mes + 1,
        },
        end: {
          year: selected[selected.length - 1].year,
          day: `${
            selected.length == 1
              ? selected[selected.length - 1].dia + 1
              : selected[selected.length - 1].dia
          }`,
          month: selected[selected.length - 1].mes + 1,
        },
      },
      id: id,
      dates_prev: {
        start: {
          year: 2024,
          day: 22,
          month: 10,
        },
        end: {
          year: 2024,
          day: 23,
          month: 10,
        },
      },
    };

    try {
      const response = await fetch(
        "http://192.168.0.110/scada-vis/trends/fetch",
        {
          headers: {
            accept: "application/json, text/javascript, */*; q=0.01",
            "accept-language": "es-419,es;q=0.9",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "x-requested-with": "XMLHttpRequest",
            cookie:
              "user_language=; x-logout=0; x-auth=; x-fail-cnt=0; x-login=1",
            Referer: "http://192.168.0.105/scada-vis/trends?id=1&mode=day",
            "Referrer-Policy": "strict-origin-when-cross-origin",
          },
          body: `data=${encodeURIComponent(JSON.stringify(bodyData))}`,
          method: "POST",
        }
      );

      const data = await response.json();

      if (response.ok) {
        return data;
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateChart = async () => {
    try {
      const [r1, r2, r3] = await Promise.all([
        getMeterData(pisoSelected[0]),
        getMeterData(pisoSelected[1]),
        getMeterData(pisoSelected[2]),
      ]);

      setVoltajes(r1.current.data);
      setVoltajes2(r2.current.data);
      setVoltajes3(r3.current.data);
    } catch (e) {
      console.log(e);
    }
  };

  // useEffect(() => {
  //   updateChart();
  // }, [pisoSelected, selected]);

  const DB = false;

  const dataGraphicTemplate = {
    numVarPhysics: 1,
    namesAxisY: ["Voltaje (v)"],
    positionAxisY: [0],
    numDataByVarPhysics: [3],
    data: [],
    namesVar: [["Voltaje 1", "Voltaje 2", "Voltaje 3"]],
    type: [0],
    minRangeAxisX: resolution,
    opacity: [0.2],
    zoom: true,
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const voltajeData = await getDataDB(
          "Voltaje",
          1,
          `${selected[0]?.year}-${selected[0]?.mes + 1}-${
            selected[0]?.dia < 10 ? `0${selected[0]?.dia}` : selected[0]?.dia
          }T00:00:00Z`,
          `${selected[0]?.year}-${selected[0]?.mes + 1}-${
            selected[0]?.dia < 10 ? `0${selected[0]?.dia}` : selected[0]?.dia
          }T23:59:00Z`,
          "Medidor"
        );

        setDataLoaded({
          ...dataGraphicTemplate,
          data: [voltajeData],
        });
      } catch (e) {
        setDataLoaded(null);
      }
    }

    if (DB) {
      fetchData();
    } else {
      setDataLoaded({
        ...dataGraphicTemplate,
        data: [[voltajes, voltajes2, voltajes3]],
      });
    }
  }, [DB, selected, pisoSelected, floor, currentDate]);

  if (!dataLoaded) {
    return (
      <div className="lds-ellipsis min-w-full min-h-32 flex items-center justify-center m-auto  left-1/2">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }

  const resultGraphics = chartGenerator(dataLoaded, fechaStart, DB);

  const createCalendar = () => {
    const today = new Date();
    
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <div>
        <div className="relative w-fit">
          <div
            className="border-b px-4 py-2 rounded w-fit flex items-center gap-4 text-sm font-semibold cursor-pointer relative text-gray-700"
            onClick={() => setShoDays(!showDays)}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              className="hover:scale-105 transition-all"
            >
              <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path d="M8 2v4m8-4v4" />
                <rect width="18" height="18" x="3" y="4" rx="2" />
                <path d="M3 10h18" />
              </g>
            </svg>
            {selected.length > 1
              ? `${selected[0]?.dia}  ${months[selected[0]?.mes]}, ${
                  selected[0]?.year
                } - ${selected[selected.length - 1].dia}  ${
                  months[selected[selected.length - 1].mes]
                }, ${selected[selected.length - 1].year}`
              : `${selected[0]?.dia}  ${months[selected[0]?.mes]}, ${
                  selected[0]?.year
                }`}
          </div>
          {showDays && (
            <>
              <div className=" w-[250px] absolute top-full left-0 bg-white border rounded flex  items-center gap-4 justify-center">
                <div>
                  <div className="flex justify-between w-full items-center py-2 font-semibold text-sm text-yellow-800">
                    <button onClick={() => handleBackMonth()}>
                      <svg
                        width="25"
                        height="25"
                        viewBox="0 0 24 24"
                        className="text-gray-600"
                      >
                        <path
                          fill="currentColor"
                          d="m8.82 12l7.715 7.716q.22.22.218.528t-.224.529q-.221.221-.529.221t-.529-.221L7.83 13.136q-.243-.242-.354-.54q-.112-.298-.112-.596t.112-.596t.354-.54l7.64-7.644q.221-.221.532-.218q.31.003.531.224t.222.529t-.222.528z"
                        />
                      </svg>
                    </button>
                    <h1
                      className="cursor-pointer  active:scale-95 transition-all"
                      onClick={() => setSelectedOption(3)}
                    >
                      {months[month]} {year}
                    </h1>
                    <button onClick={() => handleNextMonth()}>
                      <svg
                        width="25"
                        height="25"
                        viewBox="0 0 24 24"
                        className="rotate-180 text-gray-600"
                      >
                        <path
                          fill="currentColor"
                          d="m8.82 12l7.715 7.716q.22.22.218.528t-.224.529q-.221.221-.529.221t-.529-.221L7.83 13.136q-.243-.242-.354-.54q-.112-.298-.112-.596t.112-.596t.354-.54l7.64-7.644q.221-.221.532-.218q.31.003.531.224t.222.529t-.222.528z"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="grid grid-cols-7 justify-items-center w-full gap-1  p-1 border-t-0">
                    {week.map((w, i) => (
                      <p
                        key={i}
                        className={`w-full text-center text-sm p-1 border-y font-semibold text-yellow-900 m-2`}
                      >
                        {w}
                      </p>
                    ))}
                    {calendar.map((d, i) => (
                      <p
                        key={i}
                        onMouseDown={() => handleMouseDown(d)}
                        onMouseEnter={() => handleMouseEnter(d)}
                        onMouseUp={handleMouseUp}
                        className={`hover:bg-yellow-200 hover:text-gray-950 cursor-pointer text-center transition-all  flex items-center justify-center aspect-square rounded-full w-5 h-5 p-4 ${
                          handleIsSelected(d) && "bg-yellow-300"
                        } 
                   
                      ${
                        selectedOption == 1 &&
                        d <= selected[0]?.dia - 7 &&
                        "bg-yellow-300"
                      } 
  
                      ${
                        selectedOption == 2 &&
                        calendar[i].mes == month &&
                        "bg-yellow-300"
                      }
  
                     `}
                      >
                        {d.dia}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {showDays && selectedOption == 3 && (
            <div className="w-[300px] absolute top-full left-0 bg-white border rounded gap-2 p-2  grid grid-cols-2 shadow justify-items-center">
              {months.map((m, i) => (
                <button
                  onClick={() => {
                    handleSetMonth(i);
                    setSelectedOption(0);
                  }}
                  key={i}
                  className={`border py-2 rounded font-medium hover:bg-yellow-200 transition-all text-gray-700 hover:text-yellow-950 active:scale-90 w-28 border-transparent ${
                    m == months[month] && "bg-yellow-200 text-yellow-900"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <Chart
        onDoubleClick={() => {
          chartRef.current ? chartRef.current.resetZoom() : "";
        }}
        ref={chartRef}
        data={resultGraphics.data}
        options={resultGraphics.options}
      />
    </div>
  );
}

export default Voltajes;
