import { useState, useEffect, useRef, useMemo } from "react";
import Calendar from "../components/Calendar";
import useData from "../store/dataState";
import trends from "../data/trends";
import chartGenerator from "../utils/chartGenerator";
import { totalAccumulatedEnergy } from "../utils/influxDB";
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

function Energy({ id }) {
  const chartRef = useRef(null);
  const calendarRef = useRef(null);
  const { floor, db, subView } = useData();

  const dataMapping = {
    5: {
      0: ["32/1/1", "32/1/2", "32/1/3", "32/1/4"],
      1: ["32/1/11", "32/1/12", "32/1/13", "32/1/14"],
    },
    7: {
      0: ["32/1/21", "32/1/22", "32/1/23", "32/1/24"],
      1: ["32/1/31", "32/1/32", "32/1/33", "32/1/34"],
    },
  };

const [data, setData] = useState(Array.from({ length: 20}, () => Math.floor(Math.random() * 100)));
const [data2, setData2] = useState(Array.from({ length: 20}, () => Math.floor(Math.random() * 100)));
const [data3, setData3] = useState(Array.from({ length: 20}, () => Math.floor(Math.random() * 100)));
const [data4, setData4] = useState(Array.from({ length: 20}, () => Math.floor(Math.random() * 100)));

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
      resolution: 86400,
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
      const [r1, r2, r3, r4] = await Promise.all([
        getMeterData(dataMapping[floor][subView][0]),
        getMeterData(dataMapping[floor][subView][1]),
        getMeterData(dataMapping[floor][subView][2]),
        getMeterData(dataMapping[floor][subView][3]),
      ]);

      setData(r1.current.data);
      setData2(r2.current.data);
      setData3(r3.current.data);
      setData4(r4.current.data);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchDataDB = async () => {
    try {
      const voltajeData = await totalAccumulatedEnergy(
        "Energia Activa",
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
        "Medidor"
      );

      setData(voltajeData?.[0]);
      setData2(voltajeData?.[1]);
      setData3(voltajeData?.[2]);
      setData4(voltajeData?.[3]);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    db ? fetchDataDB() : updateChart();
  }, [floor, db, subView]);

  let resultGraphics = useMemo(() => {
    let dataGraphicTemplate = {
      numVarPhysics: 1,
      namesAxisY: ["Energia (Kwh)"],
      positionAxisY: [0],
      numDataByVarPhysics: [4],
      data: [[data, data2, data3, data4]],
      namesVar: [["L1", "L2", "L3", "Total"]],
      type: [1],
      minRangeAxisX: db ? 5 : 1440,
      opacity: [0.2],
      zoom: true,
      title: "Energia",
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

export default Energy;
