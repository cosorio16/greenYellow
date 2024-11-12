import { useEffect, useState } from "react";
import useData from "../store/dataState";

function Cardnav({ floorName, floorCard }) {
  const { updateView, updateSubView, updateFloor } = useData();

  const piso5 = ["33/0/1", "33/0/2", "33/0/5", "33/0/6", "33/0/7", "33/0/11"];
  const piso7 = ["33/0/3", "33/0/4", "33/0/9", "33/0/10", "33/0/8", "33/0/12"];

  const [namesNav, setNamesNav] = useState([
    "Medidor 1",
    "Medidor 2",
    "Sensor 1",
    "Sensor 2",
    "Sensor 3",
    "Sensor 4",
  ]);

  const handleViewByNav = (v) => {
    updateFloor(floorCard);
    updateView(2);
    updateSubView(v);
  };

  useEffect(() => {
    const pisos = floorCard == 5 ? piso5 : piso7;
    const currentNames = [...namesNav];

    const createCallback = (index) => (e) => {
      currentNames[index] = e;
      setNamesNav([...currentNames]);
    };

    const listeners = pisos.map((p, index) => {
      const callback = createCallback(index);
      localbus.listen("object", `${p}`, callback);
      return { address: p, callback };
    });

    return () => {
      listeners.forEach(({ address, callback }) => {
        localbus.unlisten("object", address, callback);
      });
    };
  }, []);

  return (
    <div className=" px-10 py-8 flex flex-col gap-4 bg-white h-fit rounded-xl border-gray-200 border-4 ">
      <h1 className="flex items-center gap-4 text-2xl font-semibold">
        <svg width="25" height="25" viewBox="0 0 24 24">
          <g
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          >
            <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
            <path d="m6.08 9.5l-3.5 1.6a1 1 0 0 0 0 1.81l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9a1 1 0 0 0 0-1.83l-3.5-1.59" />
            <path d="m6.08 14.5l-3.5 1.6a1 1 0 0 0 0 1.81l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9a1 1 0 0 0 0-1.83l-3.5-1.59" />
          </g>
        </svg>
        {floorName}
      </h1>

      <div className="flex flex-col gap-4  ">
        {namesNav.map((n, index) => (
          <button
            onClick={() => handleViewByNav(index)}
            key={index}
            className="flex items-center w-full px-6 py-3 rounded justify-between bg-gray-100 backdrop-blur bg-opacity-70 uppercase hover:scale-105  transition-all font-semibold"
          >
            <span className="flex items-center gap-4">
              {index < 2 ? (
                <svg
                  width="25"
                  height="25"
                  viewBox="-6 -2 24 24"
                  className=" text-yellow-400"
                >
                  <path
                    fill="currentColor"
                    d="M8.997 6.968H6.708V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v5.923a1 1 0 0 0 .966 1l1.937.061v7.404a.549.549 0 0 0 1.053.216l3.96-9.242a1 1 0 0 0-.92-1.394zM8.708 3v1.968h.289a3 3 0 0 1 2.757 4.181l-3.96 9.243a2.549 2.549 0 0 1-4.891-1.004v-5.466A3 3 0 0 1 0 8.923V3a3 3 0 0 1 3-3h2.708a3 3 0 0 1 3 3"
                  />
                </svg>
              ) : (
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 32 32"
                  className=" text-yellow-400"
                >
                  <path
                    fill="currentColor"
                    d="M26 16a9.9 9.9 0 0 0-1.14-4.618l-1.495 1.496A7.95 7.95 0 0 1 24 16zm-2.586-6L22 8.586L17.285 13.3A3 3 0 0 0 16 13a3 3 0 1 0 3 3a3 3 0 0 0-.3-1.285zM16 17a1 1 0 1 1 1-1a1 1 0 0 1-1 1m0-9a8 8 0 0 1 3.122.635l1.496-1.496A9.986 9.986 0 0 0 6 16h2a8.01 8.01 0 0 1 8-8"
                  />
                  <path
                    fill="currentColor"
                    d="M16 30a14 14 0 1 1 14-14a14.016 14.016 0 0 1-14 14m0-26a12 12 0 1 0 12 12A12.014 12.014 0 0 0 16 4"
                  />
                </svg>
              )}

              {n}
            </span>
            <svg
              className="text-yellow-400"
              width="25"
              height="25"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m10 17l5-5m0 0l-5-5"
              />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Cardnav;
