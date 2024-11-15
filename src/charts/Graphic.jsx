import { useState, useEffect, useRef} from 'react';
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
import zoomPlugin from 'chartjs-plugin-zoom';
import { getDataDB } from "../Utils/InfluxDB.js";
import chartGenerator from "../Utils/chartGenerator.js";


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
  scales,
)


function AppGraphics() {
  const chartRef = useRef(null);
  const [dataLoaded, setDataLoaded] = useState(null);
  const [error, setError] = useState(null);
  const DB = false;
  const fechaStart = "2024-11-07 00:00:00";
  const min = "2024-11-01T00:00:00Z"
  const max = "2024-11-01T01:00:00Z"

  const dataGraphicTemplate = {
    title: false,
    numVarPhysics: 1,
    namesAxisY: ['Voltaje (v)', 'Corriente (A)', 'Temperatura (°C)'],
    positionAxisY: [0, 1, 1],
    numDataByVarPhysics: [3, 1, 1],
    data: [],
    namesVar: [
      ["Voltaje L1", "Voltaje L2", "Voltaje L3"],
      ["Corriente L1", "Corriente L2", "Corriente L3"],
      ["Temp 1", "Temp 2", "Temp 3"],
    ],
    type: [0, 0, 0],
    minRangeAxisX: 5,
    opacity: [0.2, 0.2, 0.2],
    zoom: true
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const voltajeData = await getDataDB("Voltaje", 1, min, max, 'Medidor')
        const temperaturaData = await getDataDB("Corriente", 1, min, max, 'Medidor')
        const potenciaActivaData = await getDataDB("Temperatura", 1, min, max, 'Sensor')

        setDataLoaded({
          ...dataGraphicTemplate,
          data: [voltajeData, temperaturaData, potenciaActivaData]
        });

      } catch (error) {
        console.error("Error al obtener datos de la base de datos:", error);
        setError(true)
      }
    }

    if (DB) {
      fetchData();
    } else {
      setDataLoaded({
        ...dataGraphicTemplate,
        data: [
          [[1],[2],[3]],
          [[],[],[]],
          [[],[],[]]
        ]
      });
    }



    
  }, [DB]);

  if (!dataLoaded) {
    return <div>Cargando...</div>;
  }

  if (error) {
    console.log('Error DB')
  }
  
  const resultGraphics = chartGenerator(dataLoaded, fechaStart, DB);

  return (
    <div className="w-full">
      <Chart 
        onDoubleClick={() => { chartRef.current ?  chartRef.current.resetZoom() : '' }}
        ref={chartRef} 
        data={resultGraphics.data} 
        options={resultGraphics.options} 
      />
    </div>
  );
}

export default AppGraphics;
