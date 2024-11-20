import { useState, useEffect } from "react";
import useData from "../store/dataState";

function Floorselect() {
  const { floor, updateFloor } = useData();
  const [showOptions, setShowOptions] = useState(false);
  const [floorName, setFloorName] = useState(`Piso ${floor}`);

  const handleFloor = (val) => {
    const toNumberValue = Number(val);
    updateFloor(toNumberValue);
  };

  useEffect(() => {
    floor == 5 ? setFloorName("Piso 5") : setFloorName("Piso 7");
  }, [floor]);

  return (
    <div
      className="px-4 py-2 flex items-center justify-between text-lg relative gap-4 cursor-pointer hover:border-b transition-all border-b border-transparent hover:border-gray-300 min-w-fit w-44"
      onClick={() => setShowOptions(!showOptions)}
    >
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
      <svg
        width="25"
        height="25"
        viewBox="0 0 24 24"
        className={`${showOptions ? "rotate-180" : "rotate-0"} transition-all `}
      >
        <path fill="currentColor" d="m12 15l-5-5h10z" />
      </svg>
      {showOptions && (
        <div className="flex flex-col absolute top-11 bg-white w-full left-0  border border-gray-300 rounded">
          <div
            onClick={() => handleFloor(5)}
            className={`hover:bg-yellow-200 transition-all py-2 cursor-pointer border-b px-4 ${
              floor == 5 && "bg-yellow-300"
            }`}
          >
            Piso 5
          </div>
          <div
            onClick={() => updateFloor(7)}
            className={`hover:bg-yellow-200 transition-all py-2 cursor-pointer border-b px-4 ${
              floor == 7 && "bg-yellow-300"
            }`}
          >
            Piso 7
          </div>
        </div>
      )}
    </div>
  );
}

export default Floorselect;
