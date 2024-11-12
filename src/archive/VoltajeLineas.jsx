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
import genGraphic from "../utils/generGraphics";

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

import trends from "../data/trends";
import { useState, useEffect } from "react";
import useData from "../store/dataState";

function VoltajeLineas() {
  const { floor } = useData();

  const [voltajes, setVoltajes] = useState([]);
  const [voltajes2, setVoltajes2] = useState([]);
  const [voltajes3, setVoltajes3] = useState([]);

  const piso5 = ["32/1/51", "32/1/52", "32/1/53"];
  const piso7 = ["32/1/71", "32/1/72", "32/1/73"];

  const [pisoSelected, setPisoSelected] = useState([]);

  useEffect(() => {
    floor == "5" ? setPisoSelected(piso5) : setPisoSelected(piso7);
  }, [floor]);

  const DB = false;
  const fechaStart = "2024-11-07 00:00:00";
  const dataGraphic = {
    numVarPhysics: 1,
    namesAxisY: ["Voltaje (V)"],
    positionAxisY: [1],
    numDataByVarPhysics: [3],
    data: [[voltajes, voltajes2, voltajes3]],
    namesVar: [["Voltaje 1", "Voltaje 2", "Voltaje 3"]],
    type: [0],
    minRangeAxisX: 5,
    opacity: [0.2, 0.2, 0.2],
  };

  const getMeterData = async (gp) => {
    const id = trends.filter((t) => t.object == localbus.encodega(gp))[0].id;

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

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    updateChart();
  }, [pisoSelected]);

  const resultGraphics = genGraphic(dataGraphic, fechaStart, DB);
  return (
    <>
      <Chart data={resultGraphics.data} options={resultGraphics.options} />
    </>
  );
}

export default VoltajeLineas;
