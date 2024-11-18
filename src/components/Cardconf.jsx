import { useState, useEffect } from "react";
import Floorselect from "./Floorselect";
import useData from "../store/dataState";

function Cardconf() {
  const { floor } = useData();

  const optionsConf = [
    "Medidor 1",
    "Medidor 2",
    "Sensor 1",
    "Sensor 2",
    "Sensor 3",
    "Sensor 7",
  ];

  const optionsConf7 = [
    "Medidor 3",
    "Medidor 4",
    "Sensor 4",
    "Sensor 5",
    "Sensor 6",
    "Sensor 8",
  ];

  const piso5 = ["33/0/1", "33/0/2", "33/0/5", "33/0/6", "33/0/7", "33/0/11"];
  const piso7 = ["33/0/3", "33/0/4", "33/0/9", "33/0/10", "33/0/8", "33/0/12"];
  const [dataInput, setDataInput] = useState([]);
  const [pisos, setPisos] = useState(piso5);
  const [options, setOptions] = useState([]);
  const [names, setNames] = useState([]);
  const [date, setDate] = useState({});
  const [time, setTime] = useState({});
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

  useEffect(() => {
    const callBackDate = (e) => {
      setDate(e);
    };

    const callBackTime = (e) => {
      setTime(e);
    };

    localbus.listen("object", "32/0/1", callBackTime);
    localbus.listen("object", "32/0/2", callBackDate);

    return () => {
      localbus.unlisten("object", "32/0/1", callBackTime);
      localbus.unlisten("object", "32/0/2", callBackDate);
    };
  }, []);

  useEffect(() => {
    const filteredInputs = dataInput.filter((d) => d !== undefined);
    filteredInputs.length > 0 ? setEditing(true) : setEditing(false);
  }, [dataInput]);

  useEffect(() => {
    if (floor == 5) {
      setOptions(optionsConf);
      setPisos(piso5);
    } else {
      setOptions(optionsConf7);
      setPisos(piso7);
    }
  }, [floor]);

  useEffect(() => {
    const currentNames = [...names];

    const createCallback = (index) => (e) => {
      currentNames[index] = e;
      setNames([...currentNames]);
    };

    const listeners = pisos.map((p, index) => {
      const callBack = createCallback(index);
      localbus.listen("object", `${p}`, callBack);
      return { address: p, callBack };
    });

    return () => {
      listeners.forEach(({ address, callBack }) => {
        localbus.unlisten("object", address, callBack);
      });
    };
  }, [pisos]);

  const [editing, setEditing] = useState(false);

  const handleChangeNames = (val, index) => {
    const filteredInputs = dataInput.filter((d) => d !== undefined);
    filteredInputs.length > 0 &&
      dataInput.map((d, index) => {
        if (d !== undefined && d.trim() !== "") {
          localbus.write(`${pisos[index]}`, `${d}`);
        }
      });
    setEditing(false);
  };

  const handleNameInput = (val, index) => {
    if (val.trim() !== "") {
      dataInput[index] = val;
    } else {
      delete dataInput[index];
    }
    setDataInput([...dataInput]);
  };

  const handleSetConfiguration = async () => {
    const now = new Date();
    const timeh = String(now.getHours());
    const timem = String(now.getMinutes());
    const times = String(now.getSeconds());
    const date = `${now.getDate()}.${now.getMonth() + 1}.${now.getFullYear()}`;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const data = {
      timeh,
      timem,
      times,
      date,
      timezone,
      firstday: "1",
      latitude: "",
      longitude: "",
    };

    const encodedData = `data=${encodeURIComponent(JSON.stringify(data))}`;

    await fetch(`http://${window.location.host}/scada-main/general/datetime-save`, {
      method: "POST",
      headers: {
        accept: "*/*",
        "accept-language": "es-419,es;q=0.9",
        "content-type": "text/plain;charset=UTF-8",
        "x-requested-with": "XMLHttpRequest",
      },
      referrer: `http://${window.location.host}/scada-main/`,
      referrerPolicy: "strict-origin-when-cross-origin",
      body: encodedData,
      mode: "cors",
      credentials: "include",
    });
  };

  return (
    <div className="flex flex-col w-[50%] gap-4 px-10 py-4 border-4 rounded-lg h-fit bg-white">
      <div className=" p-6 flex flex-col gap-2 bg-gray-50 rounded">
        <p className="text-2xl">Configuración de fecha y hora</p>
        <div className="flex items-center justify-between">
          <div className="flex gap-4 items-center">
            <svg
              className="text-yellow-300"
              width="30"
              height="30"
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
            <div className="flex flex-col gap-1">
              <p className="text-lg text-gray-500">Hora del Sistema</p>
              <p className="font-semibold text-lg">
                {time &&
                  `${time.hour < 10 ? `0${time.hour}` : time.hour}:${
                    time.minute < 10 ? `0${time.minute}` : time.minute
                  }:${time.second < 10 ? `0${time.second}` : time.second}`}
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-center">
            <svg
              className="text-yellow-300"
              width="30"
              height="30"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2m0 15H5V8h14z"
              />
            </svg>
            <div className="flex flex-col gap-1">
              <p className="text-lg text-gray-500">Fecha del Sistema</p>
              <p className="font-semibold text-lg">
                {date && `${date.day} ${months[date.month - 1]}, ${date.year}`}
              </p>
            </div>
          </div>

          <button
            className=" w-10 h-10 aspect-square rounded-full flex items-center justify-center bg-yellow-400 text-white "
            onClick={() => handleSetConfiguration()}
          >
            <svg width="25" height="25" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M2.93 11.2c.072-4.96 4.146-8.95 9.149-8.95a9.16 9.16 0 0 1 7.814 4.357a.75.75 0 0 1-1.277.786a7.66 7.66 0 0 0-6.537-3.643c-4.185 0-7.575 3.328-7.648 7.448l.4-.397a.75.75 0 0 1 1.057 1.065l-1.68 1.666a.75.75 0 0 1-1.056 0l-1.68-1.666A.75.75 0 1 1 2.528 10.8zm16.856-.733a.75.75 0 0 1 1.055 0l1.686 1.666a.75.75 0 1 1-1.054 1.067l-.41-.405c-.07 4.965-4.161 8.955-9.18 8.955a9.2 9.2 0 0 1-7.842-4.356a.75.75 0 1 1 1.277-.788a7.7 7.7 0 0 0 6.565 3.644c4.206 0 7.61-3.333 7.68-7.453l-.408.403a.75.75 0 1 1-1.055-1.067z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
      <div>
        <div className="flex gap-2 items-center">
          <Floorselect></Floorselect>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-10">
        {options.map((o, index) => (
          <div key={index}>
            <h1 className="text-gray-400 text-sm font-medium">{o}</h1>
            <input
              type="text"
              name=""
              id=""
              className="border uppercase px-4 py-2 w-full rounded"
              placeholder={`${names[index]}`}
              onChange={(e) => handleNameInput(e.target.value, index)}
            />
          </div>
        ))}
        <div></div>
      </div>
      {editing && (
        <button
          onClick={() => handleChangeNames()}
          className="border px-6 py-2 rounded bg-black text-white w-fit m-auto font-medium hover:scale-105 transition"
        >
          Guardar
        </button>
      )}
    </div>
  );
}

export default Cardconf;
