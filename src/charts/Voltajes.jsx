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
import genGraphic from "../utils/generGraphics.js";
import getDataDB from "../utils/influxDB.js";

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

import { useState, useEffect } from "react";
import useData from "../store/dataState.js";
import trends from "../data/trends.js";
import Calendar from "../components/Calendar.jsx";

function AppGraphics() {
  const { floor, subView, db, toggleDB } = useData();
  const [dataLoaded, setDataLoaded] = useState(null);
  const [error, setError] = useState(null);

  const [zoomState, setZoomState] = useState(false);

  const [voltajes, setVoltajes] = useState([]);
  const [voltajes2, setVoltajes2] = useState([]);
  const [voltajes3, setVoltajes3] = useState([]);

  const [meterType, setMeterType] = useState("Medidor");

  const dataMapping = {
    5: { 0: 1, 1: 2, 2: 1, 3: 2, 4: 3, 5: 7 },
    7: { 0: 3, 1: 4, 2: 4, 3: 5, 4: 6, 5: 8 },
  };

  const piso5 = ["1/0/1", "1/0/11", "1/0/21"];
  const piso7 = ["1/0/3", "1/0/13", "1/0/23"];

  const [pisoSelected, setPisoSelected] = useState(piso5);

  useEffect(() => {
    floor == "5" ? setPisoSelected(piso5) : setPisoSelected(piso7);
  }, [floor]);

  const DB = true;
  const fechaStart = "2024-11-07 00:00:00";

  const dataGraphicTemplate = {
    numVarPhysics: 1,
    namesAxisY: ["Voltaje (v)"],
    positionAxisY: [0],
    numDataByVarPhysics: [3],
    data: [],
    namesVar: [["Voltaje 1", "Voltaje 2", "Voltaje 3"]],
    type: [0],
    minRangeAxisX: 5,
    opacity: [0.2],
    zoom: true,
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const voltajeData = await getDataDB(
          "Voltaje",
          1,
          "2024-10-12T00:00:00Z",
          "2024-10-12T01:00:00Z",
          "Medidor"
        );

        setDataLoaded({
          ...dataGraphicTemplate,
          data: [voltajeData],
        });
      } catch (e) {
        setError(e);
      }
    }

    if (DB) {
      fetchData();
    } else {
      setDataLoaded({
        ...dataGraphicTemplate,
        data: [voltajes, voltajes2, voltajes3],
      });
    }
  }, [DB]);

  const getMeterData = async (gp) => {
    const id = trends.filter((t, index) => t.object == localbus.encodega(gp))[0]
      .id;

    const bodyData = {
      dates_curr: {
        start: {
          year: 2024,
          day: 5,
          month: 11,
        },
        end: {
          year: 2024,
          day: 6,
          month: 11,
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

      console.log("R", r1, r2, r3);
      console.log("R", r1.current.data, r2.current.data, r3.current.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    updateChart();
  }, [pisoSelected]);

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

  const resultGraphics = genGraphic(dataLoaded, fechaStart, DB);

  return (
    <div className="w-full">
      <div className="flex items-center gap-4 justify-between">
        <Calendar></Calendar>
      </div>

      <Chart
        data={resultGraphics.data}
        options={resultGraphics.options}
        onDoubleClick={() => setZoomState(!zoomState)}
      />
    </div>
  );
}

export default AppGraphics;
