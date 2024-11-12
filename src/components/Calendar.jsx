import { useState, useMemo } from "react";

function Calendar() {
  const [showDays, setShoDays] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState(0);
  const [selectedWeek, setSelectedWeek] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const options = ["Dia", "Semana", "Mes"];

  const week = ["D", "L", "M", "M", "J", "V", "S"];
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

  const realMonth = new Date().getMonth();
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const day = currentDate.getDate();
  const desfase = currentDate.getDay();

  const calendar = useMemo(() => {
    const days = [];

    for (let i = -desfase; days.length < 42; i++) {
      days.push({
        dia: new Date(year, month, i).getDate(),
        mes: new Date(year, month, i).getMonth(),
      });
    }

    return days;
  }, [month, year]);

  const handleNextMonth = () => {
    const date = new Date(currentDate);
    date.setMonth(currentDate.getMonth() + 1);
    setCurrentDate(date);
  };

  const handleBackMonth = () => {
    const date = new Date(currentDate);
    date.setMonth(currentDate.getMonth() - 1);
    setCurrentDate(date);
  };

  return (
    <>
      <div
        className="border-b px-4 py-2 rounded flex items-center justify-between text-lg relative gap-8 cursor-pointer w-44"
        onClick={() => setShowOptions(!showOptions)}
      >
        {options[selectedOption]}
        <svg
          width="25"
          height="25"
          viewBox="0 0 24 24"
          className={`${
            showOptions ? "rotate-180" : "rotate-0"
          } transition-all `}
        >
          <path fill="currentColor" d="m12 15l-5-5h10z" />
        </svg>
        {showOptions && (
          <div className="flex flex-col absolute top-11 bg-white w-full left-0  border border-gray-300 rounded">
            {options.map((d, i) => (
              <div
                key={i}
                onClick={() => setSelectedOption(i)}
                className="hover:bg-slate-200 transition-all py-2 cursor-pointer border-b px-4"
              >
                {d}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="relative w-fit">
        <div
          className="border-b px-4 py-2 rounded w-fit flex items-center gap-10 text-lg font-semibold cursor-pointer relative text-gray-700"
          onClick={() => setShoDays(!showDays)}
        >
          Seleccionar Fecha
          <svg
            width="25"
            height="25"
            viewBox="0 0 24 24"
            className="hover:scale-105 transition-all"
          >
            <g
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            >
              <path d="M8 2v4m8-4v4" />
              <rect width="18" height="18" x="3" y="4" rx="2" />
              <path d="M3 10h18" />
            </g>
          </svg>
        </div>
        {showDays && (selectedOption == 0 || selectedOption == 1) && (
          <div className="w-full absolute top-full left-0 bg-white border rounded flex flex-col items-center gap-2 p-2">
            <div className="flex justify-between items-center w-full">
              <button onClick={() => handleBackMonth()}>
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 24 24"
                  className="text-gray-500"
                >
                  <path
                    fill="currentColor"
                    d="m8.82 12l7.715 7.716q.22.22.218.528t-.224.529q-.221.221-.529.221t-.529-.221L7.83 13.136q-.243-.242-.354-.54q-.112-.298-.112-.596t.112-.596t.354-.54l7.64-7.644q.221-.221.532-.218q.31.003.531.224t.222.529t-.222.528z"
                  />
                </svg>
              </button>
              <h1 onClick={() => setSelectedOption(2)}>
                {months[month]} {year}
              </h1>
              <button onClick={() => handleNextMonth()}>
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 24 24"
                  className="rotate-180 text-gray-500"
                >
                  <path
                    fill="currentColor"
                    d="m8.82 12l7.715 7.716q.22.22.218.528t-.224.529q-.221.221-.529.221t-.529-.221L7.83 13.136q-.243-.242-.354-.54q-.112-.298-.112-.596t.112-.596t.354-.54l7.64-7.644q.221-.221.532-.218q.31.003.531.224t.222.529t-.222.528z"
                  />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-7 justify-items-center w-full gap-y-1">
              {week.map((w, i) => (
                <p key={i} className={`w-full text-center p-2 border-y`}>
                  {w}
                </p>
              ))}
              {calendar.map((d, i) => (
                <p
                  key={i}
                  onClick={() => console.log(d)}
                  className={`text-center transition-all p-2 aspect-square rounded-full w-10 h-10 
                    ${selectedOption == 0 && d.dia == day && "bg-yellow-300"} 
                    ${
                      selectedOption == 1 &&
                      d.dia <= day &&
                      d.dia >= day - 6 &&
                      "bg-yellow-300"
                    }
                    ${
                      d.dia > 0 &&
                      d.dia <= 42 &&
                      "hover:bg-yellow-200 hover:text-gray-950 cursor-pointer"
                    }`}
                >
                  {d.dia}
                </p>
              ))}
            </div>
          </div>
        )}

        {showDays && selectedOption == 2 && (
          <div className="min-w-full absolute top-full left-0 bg-white border rounded gap-2 p-2  grid grid-cols-2 shadow">
            {months.map((m, i) => (
              <button
                onClick={() => setSelectedOption(0)}
                key={i}
                className={`border py-2 rounded font-medium hover:bg-yellow-200 transition-all text-gray-700 hover:text-gray-950 active:scale-90 shadow w-28 ${
                  m == months[realMonth] && "bg-yellow-300"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Calendar;
