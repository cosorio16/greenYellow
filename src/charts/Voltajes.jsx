import { useState, useEffect, useRef, useMemo } from "react";
import Calendar from "../components/Calendar";
import useData from "../store/dataState";
import trends from "../data/trends";
import chartGenerator from "../utils/chartGenerator";
import { getDataDB } from "../utils/influxDB";
import { Chart } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";

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

function Voltajes({ id }) {
  const chartRef = useRef(null);
  const calendarRef = useRef(null);
  const { floor, db, subView } = useData();

  const dataMapping = {
    5: {
      0: ["1/0/1", "1/0/11", "1/0/21"],
      1: ["1/0/2", "1/0/12", "1/0/22"],
    },
    7: {
      0: ["1/0/3", "1/0/13", "1/0/23"],
      1: ["1/0/4", "1/0/14", "1/0/24"],
    },
  };

const [data, setData] = useState(Array.from({ length: 20}, () => Math.floor(Math.random() * 100)));
 const [data2, setData2] = useState(Array.from({ length: 20}, () => Math.floor(Math.random() * 100)));
const [data3, setData3] = useState(Array.from({ length: 20}, () => Math.floor(Math.random() * 100)));

  const [selected, setSelected] = useState([
    {
      year: new Date().getFullYear(),
      mes: new Date().getMonth(),
      dia: new Date().getDate(),
    },
  ]);

  const [fechaStart, setFechaStart] = useState(
    `${selected[0]?.year}-${selected[0]?.mes + 1}-${
      selected[0]?.dia < 10 ? `0${selected[0]?.dia}` : selected[0]?.dia
    } 00:00:00`
  );


  useEffect(() => {
    const date = `${selected[0]?.year}-${selected[0]?.mes + 1}-${
      selected[0]?.dia < 10 ? `0${selected[0]?.dia}` : selected[0]?.dia
    } 00:00:00`;

    setFechaStart(date);
  }, [selected]);

  const getMeterData = async (gp) => {
    const id = trends.filter((t) => t.object == localbus.encodega(gp))[0].id;

    const bodyData = {
      dates_curr: {
        start: {
          year: selected[0]?.year,
          day: selected[0]?.dia,
          month: selected[0]?.mes + 1,
        },
        end: {
          year: selected[selected.length - 1].year,
          day: selected[selected.length - 1].dia + 1,
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
        `http://${window.location.host}/scada-vis/trends/fetch`,
        {
          headers: {
            accept: "application/json, text/javascript, */*; q=0.01",
            "accept-language": "es-419,es;q=0.9",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "x-requested-with": "XMLHttpRequest",
            cookie:
              "user_language=; x-logout=0; x-auth=; x-fail-cnt=0; x-login=1",
            Referer: `http://${window.location.host}/scada-vis/trends?id=1&mode=day`,
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
        getMeterData(dataMapping[floor][subView][0]),
        getMeterData(dataMapping[floor][subView][1]),
        getMeterData(dataMapping[floor][subView][2]),
      ]);

      setData(r1.current.data);
      setData2(r2.current.data);
      setData3(r3.current.data);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchDataDB = async () => {
    try {
      const voltajeData = await getDataDB(
        "Voltaje",
        `${id}`,
        `${selected[0]?.year}-${selected[0]?.mes + 1}-${
          selected[0]?.dia < 10 ? `0${selected[0]?.dia}` : selected[0]?.dia
        }T00:00:00Z`,
        `${selected[selected.length - 1]?.year}-${
          selected[selected.length - 1]?.mes + 1
        }-${
          selected[selected.length - 1]?.dia < 10
            ? `0${selected[selected.length - 1]?.dia}`
            : selected[selected.length - 1]?.dia
        }T23:59:59Z`,
        "Medidor",
        3
      );

      setData(voltajeData?.[0]);
      setData2(voltajeData?.[1]);
      setData3(voltajeData?.[2]);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    db ? fetchDataDB() : updateChart();
  }, [subView, db, floor]);

  let resultGraphics = useMemo(() => {
    let dataGraphicTemplate = {
      numVarPhysics: 1,
      namesAxisY: ["Voltaje (v)"],
      positionAxisY: [0],
      numDataByVarPhysics: [3],
      data: [[data, data2, data3]],
      namesVar: [["L1", "L2", "L3", "Total"]],
      type: [0],
      minRangeAxisX: 5,
      opacity: [0.2],
      zoom: true,
      title: "Voltajes",
    };

    return chartGenerator(dataGraphicTemplate, fechaStart, db);
  }, [data]);

  return (
    <div className="flex flex-col gap-2 ">
      <Calendar
        ref={calendarRef}
        onDateSelect={(date) => setSelected(date)}
        mouseUp={() => (db ? fetchDataDB() : updateChart())}
      />
      <Chart
        ref={chartRef}
        data={resultGraphics.data}
        options={resultGraphics.options}
        onDoubleClick={() => chartRef.current?.resetZoom()}
      ></Chart>
    </div>
  );
}

export default Voltajes;
