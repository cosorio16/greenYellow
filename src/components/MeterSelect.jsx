import { useState, useEffect } from "react";
import useData from "../store/dataState";
import { addTitle } from "../utils/DataExcel";

function MeterSelect() {
  const { floor, updateSubView, subView } = useData();
  const [showOptions, setShowOptions] = useState(false);

  const [sections, setSections] = useState([]);
  const [sectionsNames, setSectionsNames] = useState([
    "Medidor 1",
    "Medidor 2",
    "Sensor 1",
    "Sensor 2",
    "Sensor 3",
    "Sensor 4",
  ]);

  const piso5 = ["33/0/1", "33/0/2", "33/0/5", "33/0/6", "33/0/7", "33/0/11"];
  const piso7 = ["33/0/3", "33/0/4", "33/0/9", "33/0/10", "33/0/8", "33/0/12"];

  useEffect(() => {
    floor == 5 ? setSections(piso5) : setSections(piso7);
  }, [floor]);

  // useEffect(() => {
  //   const currentNamesSections = [...sectionsNames];

  //   const createCallBack = (index) => (e) => {
  //     currentNamesSections[index] = e;
  //     setSectionsNames([...currentNamesSections]);
  //   };

  //   const listeners = sections.map((s, index) => {
  //     const callback = createCallBack(index);
  //     localbus.listen("object", `${s}`, callback);
  //     return { address: s, callback };
  //   });

  //   return () => {
  //     listeners.forEach(({ address, callback }) => {
  //       localbus.unlisten("object", address, callback);
  //     });
  //   };
  // }, [sections]);

  useEffect(() => {
    addTitle(sectionsNames[subView]);
  }, [subView, sections, floor, sectionsNames]);

  return (
    <div
      className="border-b border-transparent px-4 py-2 flex items-center justify-between text-lg relative transition-all cursor-pointer gap-4 min-w-fit w-72 hover:border-gray-300 bg-neutral-50 rounded"
      onClick={() => setShowOptions(!showOptions)}
    >
      {subView < 2 ? (
        <svg width="25" height="25" viewBox="-6 -2 24 24">
          <path
            fill="currentColor"
            d="M8.997 6.968H6.708V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v5.923a1 1 0 0 0 .966 1l1.937.061v7.404a.549.549 0 0 0 1.053.216l3.96-9.242a1 1 0 0 0-.92-1.394zM8.708 3v1.968h.289a3 3 0 0 1 2.757 4.181l-3.96 9.243a2.549 2.549 0 0 1-4.891-1.004v-5.466A3 3 0 0 1 0 8.923V3a3 3 0 0 1 3-3h2.708a3 3 0 0 1 3 3"
          />
        </svg>
      ) : (
        <svg width="25" height="25" viewBox="0 0 32 32">
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
              className={`hover:bg-yellow-100 transition-all py-2 cursor-pointer border-b px-4 flex items-center gap-4 ${
                i == subView && "bg-yellow-300"
              }`}
            >
              {i < 2 ? (
                <svg width="25" height="25" viewBox="-6 -2 24 24">
                  <path
                    fill="currentColor"
                    d="M8.997 6.968H6.708V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v5.923a1 1 0 0 0 .966 1l1.937.061v7.404a.549.549 0 0 0 1.053.216l3.96-9.242a1 1 0 0 0-.92-1.394zM8.708 3v1.968h.289a3 3 0 0 1 2.757 4.181l-3.96 9.243a2.549 2.549 0 0 1-4.891-1.004v-5.466A3 3 0 0 1 0 8.923V3a3 3 0 0 1 3-3h2.708a3 3 0 0 1 3 3"
                  />
                </svg>
              ) : (
                <svg width="25" height="25" viewBox="0 0 32 32">
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MeterSelect;
