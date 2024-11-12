import { useState, useEffect } from "react";
import useData from "../store/dataState";

function MeterSelect() {
  const { floor, updateSubView, subView } = useData();
  const [showOptions, setShowOptions] = useState(false);

  const [sections, setSections] = useState([]);
  const [sectionsNames, setSectionsNames] = useState([]);

  const piso5 = ["33/0/1", "33/0/2", "33/0/5", "33/0/6", "33/0/7", "33/0/11"];
  const piso7 = ["33/0/3", "33/0/4", "33/0/9", "33/0/10", "33/0/8", "33/0/12"];

  useEffect(() => {
    floor == 5 ? setSections(piso5) : setSections(piso7);
  }, [floor]);

  useEffect(() => {
    const currentNamesSections = [...sectionsNames];

    const createCallBack = (index) => (e) => {
      currentNamesSections[index] = e;
      setSectionsNames([...currentNamesSections]);
    };

    const listeners = sections.map((s, index) => {
      const callback = createCallBack(index);
      localbus.listen("object", `${s}`, callback);
      return { address: s, callback };
    });

    return () => {
      listeners.forEach(({ address, callback }) => {
        localbus.unlisten("object", address, callback);
      });
    };
  }, [sections]);

  return (
    <div
      className="border-b border-transparent px-4 py-2 flex items-center justify-between text-lg relative transition-all cursor-pointer gap-4 w-fit hover:border-gray-300"
      onClick={() => setShowOptions(!showOptions)}
    >
      {sectionsNames[subView]}
      <svg
        width="25"
        height="25"
        viewBox="0 0 24 24"
        className={`${showOptions ? "rotate-180" : "rotate-0"} transition-all`}
      >
        <path fill="currentColor" d="m12 15l-5-5h10z" />
      </svg>
      {showOptions && (
        <div className="flex flex-col absolute top-full bg-white w-full left-0  border border-gray-300 rounded">
          {sectionsNames.map((n, i) => (
            <div
              key={i}
              onClick={() => updateSubView(i)}
              className={`hover:bg-yellow-100 transition-all py-2 cursor-pointer border-b px-4 ${n == sectionsNames[subView] && "bg-yellow-300"}`}
            >
              {n}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MeterSelect;
