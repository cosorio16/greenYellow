import { useState, useEffect } from "react";
import Headernav from "../components/Headernav";
import Footer from "../components/Footer";
import useData from "../store/dataState";
import data from "../data/topicvalues";

function Meterview() {
  const { subView, floor } = useData();
  const { meterTopics, sensorTopics } = data;

  const [currentMeter, setCurrentMeter] = useState([]);
  const [timeInput, setTimeInput] = useState(0);

  const dataMapping = {
    5: {
      0: data.meter1,
      1: data.meter2,
      2: data.sensor1,
      3: data.sensor2,
      4: data.sensor3,
      5: data.sensor7,
    },
    7: {
      0: data.meter3,
      1: data.meter4,
      2: data.sensor4,
      3: data.sensor5,
      4: data.sensor6,
      5: data.sensor8,
    },
  };

  const [topics, setTopics] = useState([]);
  const [values, setValues] = useState([]);

  useEffect(() => {
    setCurrentMeter([]);
    const selectedMeter = dataMapping[floor][subView];
    setCurrentMeter(selectedMeter);

    setTopics(
      subView == 5
        ? ["Temperatura", "Presencia", "Lumenes", "Tiempo de Detección"]
        : subView < 2
        ? meterTopics
        : sensorTopics
    );
  }, [floor, subView]);

  // useEffect(() => {
  //   let currentValues = [...values];

  //   const createCallback = (index) => (e) => {
  //     if (typeof e === "number" && !Number.isInteger(e)) {
  //       currentValues[index] = e.toFixed(2);
  //     } else if (e === true) {
  //       currentValues[index] = "Ocupado";
  //     } else if (e === false) {
  //       currentValues[index] = "Desocupado";
  //     } else {
  //       currentValues[index] = e;
  //     }
  //     setValues([...currentValues]);
  //   };

  //   const listeners = currentMeter.map((m, index) => {
  //     const callback = createCallback(index);
  //     localbus.listen("object", `${m}`, callback);
  //     return { address: m, callback };
  //   });

  //   return () => {
  //     listeners.forEach(({ address, callback }) => {
  //       localbus.unlisten("object", address, callback);
  //     });
  //   };
  // }, [currentMeter]);

  const handleSetTiming = () => {
    const inputMeter = dataMapping[floor][subView];
    timeInput !== "" &&
      localbus.write(`${inputMeter.slice(-1)}`, `${timeInput}`);
  };

  const getSigno = (topic) => {
    const topicFiltered = topic.split(" ");
    if (topicFiltered.includes("Voltaje")) {
      return "V";
    } else if (topicFiltered.includes("Corriente")) {
      return "A";
    } else if (topicFiltered.includes("Activa")) {
      return "Kw";
    } else if (topicFiltered.includes("Energia")) {
      return "Kwh";
    } else if (topicFiltered.includes("Temperatura")) {
      return "°C";
    } else if (topicFiltered.includes("Humedad")) {
      return "%";
    } else if (topicFiltered.includes("Lumenes")) {
      return "Lux";
    } else if (
      topicFiltered.includes("Compuestos") ||
      topicFiltered.includes("CO2")
    ) {
      return "ppm";
    } else if (topicFiltered.includes("Tiempo")) {
      return "seg";
    } else {
      return "";
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Headernav />
      <main className="p-1 lg:p-8 flex flex-col gap-5 grow bg-gray-100 pt-36 xl:pt-44">
        <div className="border-2 flex flex-col gap-4 px-4 lg:px-10 py-6 bg-white rounded-xl">
          <div className="grid grid-cols-2 xl:grid-cols-4 items-start gap-4  pb-4">
            {topics.map((t, index) => (
              <div key={index}>
                <h1 className="text-sm font-medium text-gray-500 capitalize line-clamp-1 lg:line-clamp-none">
                  {t}
                </h1>
                <p className="px-4 py-2 rounded bg-gray-100 text-gray-700">
                  {`${values[index] || 0} ${getSigno(t)}`}
                </p>
              </div>
            ))}
            {subView > 1 && (
              <div className="hidden xl:flex items-center gap-4 w-full">
                <svg
                  className="text-yellow-300"
                  width="35"
                  height="35"
                  viewBox="0 0 24 24"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  >
                    <path d="M12 6v6h6" />
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10" />
                  </g>
                </svg>
                <div className="w-full flex flex-col gap-1">
                  <h1 className="text-lg font-semibold">Tiempo de detección</h1>
                  <div className="flex gap-4 items-center">
                    <input
                      type="number"
                      name=""
                      id=""
                      placeholder={`${timeInput} seg`}
                      onChange={(e) => setTimeInput(e.target.value)}
                      className="py-2 px-4 w-full border rounded"
                    />
                    <button
                      onClick={() => handleSetTiming()}
                      className="px-4 py-2 border rounded bg-gray-900 text-white font-medium m-auto w-fit"
                    >
                      Guardar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default Meterview;
