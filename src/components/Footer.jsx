import { useState, useEffect } from "react";
import useData from "../store/dataState";

function Footer() {
  const { floor } = useData();

  const [values, setValues] = useState([]);
  const [piso, setPiso] = useState([]);

  useEffect(() => {
    floor == 5
      ? setPiso(["32/1/40", "32/1/42"])
      : setPiso(["32/1/41", "32/1/43"]);
  }, [floor]);

  useEffect(() => {
    let currentValues = [...values];

    const createCallback = (index) => (e) => {
      if (typeof e == "number" && !Number.isInteger(e)) {
        currentValues[index] = e.toFixed(2);
      } else {
        currentValues[index] = e;
      }
      setValues([...currentValues]);
    };

    const listeners = piso.map((p, index) => {
      const callback = createCallback(index);
      localbus.listen("object", `${p}`, callback);
      return { address: p, callback };
    });

    return () => {
      listeners.forEach(({ address, callback }) => {
        localbus.unlisten("object", address, callback);
      });
    };
  }, [piso]);

  return (
    <footer className="flex justify-center gap-32 items-center py-4 bg-gray-100 border-t-2">
      <div className="flex gap-2 items-center border bg-gray-50 h-full px-8 py-6 rounded">
        <svg
          className="text-yellow-300 "
          width="40"
          height="40"
          viewBox="-6 -2 24 24"
        >
          <path
            fill="currentColor"
            d="M8.997 6.968H6.708V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v5.923a1 1 0 0 0 .966 1l1.937.061v7.404a.549.549 0 0 0 1.053.216l3.96-9.242a1 1 0 0 0-.92-1.394zM8.708 3v1.968h.289a3 3 0 0 1 2.757 4.181l-3.96 9.243a2.549 2.549 0 0 1-4.891-1.004v-5.466A3 3 0 0 1 0 8.923V3a3 3 0 0 1 3-3h2.708a3 3 0 0 1 3 3"
          />
        </svg>
        <div>
          <h1 className="font-semibold">Potencia Activa total</h1>
          <p>{values[1]} Kw</p>
        </div>
      </div>
      <div className="flex gap-2 items-center border bg-gray-50 h-full px-8 py-6">
        <svg
          className="text-yellow-300"
          width="40"
          height="40"
          viewBox="-6 -2 24 24"
        >
          <path
            fill="currentColor"
            d="M8.997 6.968H6.708V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v5.923a1 1 0 0 0 .966 1l1.937.061v7.404a.549.549 0 0 0 1.053.216l3.96-9.242a1 1 0 0 0-.92-1.394zM8.708 3v1.968h.289a3 3 0 0 1 2.757 4.181l-3.96 9.243a2.549 2.549 0 0 1-4.891-1.004v-5.466A3 3 0 0 1 0 8.923V3a3 3 0 0 1 3-3h2.708a3 3 0 0 1 3 3"
          />
        </svg>
        <div>
          <h1 className="font-semibold">Energia Consumida total</h1>
          <p>{values[0]} Kwh</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
