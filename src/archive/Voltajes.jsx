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
import Calendar from "../components/Calendar.jsx";

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
import { useState, useEffect, useRef } from "react";
import trends from "../data/trends.js";

function Voltajes() {
  const chartRef = useRef(null);
  const calendarRef = useRef(null);
  const { floor } = useData();

  // Estados principales
  const [dataLoaded, setDataLoaded] = useState(null);
  const [voltajes, setVoltajes] = useState([]);
  const [voltajes2, setVoltajes2] = useState([]);
  const [voltajes3, setVoltajes3] = useState([]);
  const [pisoSelected, setPisoSelected] = useState([]);
  const [resolution, setResolution] = useState(5);
  const [selected, setSelected] = useState([
    {
      year: new Date().getFullYear(),
      mes: new Date().getMonth(),
      dia: new Date().getDate(),
    },
  ]);
  const [fechaStart, setFechaStart] = useState("");

  const piso5 = ["1/0/1", "1/0/11", "1/0/21"];
  const piso7 = ["1/0/3", "1/0/13", "1/0/23"];

  // Actualiza el piso seleccionado cuando cambia el piso
  useEffect(() => {
    setPisoSelected(floor === 5 ? piso5 : piso7);
  }, [floor]);

  // Calcula la fecha inicial y resuelve la resolución cuando cambia la selección de fechas
  useEffect(() => {
    const date = `${selected[0]?.year}-${selected[0]?.mes + 1}-${
      selected[0]?.dia < 10 ? `0${selected[0]?.dia}` : selected[0]?.dia
    } 00:00:00`;

    setResolution(selected.length > 1 ? 60 : 5);
    setFechaStart(date);
  }, [selected]);

  // Función para obtener datos del medidor
  const getMeterData = async (gp) => {
    const trend = trends.find((t) => t.object === gp);
    if (!trend) return null;

    const bodyData = {
      resolution: resolution * 60,
      dates_curr: {
        start: {
          year: selected[0]?.year,
          day: selected[0]?.dia,
          month: selected[0]?.mes + 1,
        },
        end: {
          year: selected[0]?.year,
          day: selected.length === 1 ? selected[0]?.dia + 1 : selected[0]?.dia,
          month: selected[0]?.mes + 1,
        },
      },
      id: trend.id,
    };

    try {
      const response = await fetch(
        `http://${window.location.host}/scada-vis/trends/fetch`,
        {
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bodyData),
          method: "POST",
        }
      );

      if (!response.ok) throw new Error("Error fetching data");
      return await response.json();
    } catch (error) {
      console.error("Error fetching meter data:", error);
      return null;
    }
  };

  // Actualiza los datos de los voltajes y el gráfico
  const updateChart = async () => {
    try {
      const [data1, data2, data3] = await Promise.all(
        pisoSelected.map((gp) => getMeterData(gp))
      );

      setVoltajes(data1?.current?.data || []);
      setVoltajes2(data2?.current?.data || []);
      setVoltajes3(data3?.current?.data || []);
    } catch (error) {
      console.error("Error updating chart:", error);
    }
  };

  // Carga inicial y actualización del gráfico cuando cambian dependencias clave
  useEffect(() => {
    updateChart();
  }, [pisoSelected, selected, resolution]);

  // Genera la configuración del gráfico cuando cambian los datos
  useEffect(() => {
    const dataGraphicTemplate = {
      numVarPhysics: 1,
      namesAxisY: ["Voltaje (v)"],
      positionAxisY: [0],
      numDataByVarPhysics: [3],
      data: [[voltajes, voltajes2, voltajes3]],
      namesVar: [["Voltaje 1", "Voltaje 2", "Voltaje 3"]],
      type: [0],
      minRangeAxisX: resolution,
      opacity: [0.2],
      zoom: true,
    };

    setDataLoaded(chartGenerator(dataGraphicTemplate, fechaStart, false));
  }, [voltajes, voltajes2, voltajes3, resolution, fechaStart]);

  return (
    <div className="w-full flex flex-col gap-2">
      {!dataLoaded ? (
        <div className="lds-ellipsis min-w-full min-h-32 flex items-center justify-center">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        <>
          <Calendar
            ref={calendarRef}
            onDateSelect={(date) =>
              setSelected([
                {
                  year: date.getFullYear(),
                  mes: date.getMonth(),
                  dia: date.getDate(),
                },
              ])
            }
          />
          <Chart
            ref={chartRef}
            data={dataLoaded.data}
            options={dataLoaded.options}
            onDoubleClick={() => chartRef.current?.resetZoom()}
          />
        </>
      )}
    </div>
  );
}

export default Voltajes;
