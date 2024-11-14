import { useState, useEffect, useRef } from "react";
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
import { totalAccumulatedEnergy } from "../utils/influxDB.js";
import chartGenerator from "../utils/chartGenerator.js";
import trends from "../data/trends.js";

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

function GraphicEnergia() {
  const chartRef = useRef(null);
  const [dataLoaded, setDataLoaded] = useState(null);
  const [error, setError] = useState(null);
  const DB = false;
  //local
  const fechaStart = "2024-11-07 00:00:00";

  //influx
  const min = "2024-10-20T00:00:00Z";
  const max = "2024-11-06T00:00:00Z";

  const [voltajes, setVoltajes] = useState([]);
  const [voltajes2, setVoltajes2] = useState([]);
  const [voltajes3, setVoltajes3] = useState([]);

  const piso5 = ["1/0/1", "1/0/11", "1/0/21"];
  const piso7 = ["1/0/3", "1/0/13", "1/0/23"];

  const [pisoSelected, setPisoSelected] = useState(piso5);

  const dataGraphicTemplate = {
    title: false,
    numVarPhysics: 1,
    namesAxisY: ["Energia (kwh)", "Corriente (A)", "Temperatura (°C)"],
    positionAxisY: [0],
    numDataByVarPhysics: [3],
    data: [],
    namesVar: [["L1", "L2", "L3", "Total"]],
    type: [1],
    minRangeAxisX: 60 * 24,
    opacity: [0.2],
    zoom: true,
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const voltajeData = await totalAccumulatedEnergy(
          "Energia Activa",
          1,
          min,
          max,
          1
        );
        setDataLoaded({
          ...dataGraphicTemplate,
          data: [voltajeData],
        });
      } catch (error) {
        console.error("Error al obtener datos de la base de datos:", error);
        setError(true);
      }
    }

    if (DB) {
      fetchData();
    } else {
      setDataLoaded({
        ...dataGraphicTemplate,
        data: [[[voltajes], [voltajes2], [voltajes3]]],
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
          day: 10,
          month: 11,
        },
        end: {
          year: 2024,
          day: 11,
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

  // useEffect(() => {
  //   updateChart();
  // }, []);

  if (!dataLoaded) {
    return <div>Cargando...</div>;
  }

  if (error) {
    console.log("Error DB");
  }
  const resultGraphics = chartGenerator(dataLoaded, fechaStart, DB);

  return (
    <div className="w-full">
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

export default GraphicEnergia;
