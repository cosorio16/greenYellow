import { useState, useMemo } from "react";

function Calendar() {
  const [showDays, setShoDays] = useState(false);
  const [selectedOption, setSelectedOption] = useState(0);
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

  const [selected, setSelected] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  const [start, setStart] = useState(null);

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const day = currentDate.getDate();
  const desfase = new Date(year, month, 1).getDay();

  const calendar = useMemo(() => {
    const days = [];

    for (let i = -desfase + 1; days.length < 42; i++) {
      days.push({
        dia: new Date(year, month, i).getDate(),
        mes: new Date(year, month, i).getMonth(),
        year: new Date(year, month, i).getFullYear(),
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

  const handleSetDay = (d, m, y) => {
    const date = new Date(y, m, d);
    setCurrentDate(date);
  };

  const handleSetMonth = (i) => {
    const date = new Date(currentDate);
    date.setMonth(i);
    setCurrentDate(date);
  };

  const handleMouseDown = (date) => {
    setIsSelected(true);
    setStart(date);
    setSelected([date]);
  };

  const handleMouseEnter = (date) => {
    if (isSelected && start) {
      const range = [start, date].sort((a, b) => {
        if (a.mes !== b.mes) return a.mes - b.mes;
        return a.dia - b.dia;
      });
      let datesSelecteds = [];
      let mes = range[0].mes;
      let dia = range[0].dia;

      while (
        mes < range[1].mes ||
        (mes === range[1].mes && dia <= range[1].dia)
      ) {
        datesSelecteds.push({ mes, dia });
        dia++;
        if (dia > 31) {
          dia = 1;
          mes++;
        }
      }

      setSelected(datesSelecteds);
    }
  };

  const handleMouseUp = () => {
    setIsSelected(false);
  };

  const handleIsSelected = (date) => {
    return selected.some(
      (selected) => selected.mes === date.mes && selected.dia === date.dia
    );
  };

  console.log(selected);

  return (
    <>
      <div className="relative w-fit">
        <div
          className="border-b px-4 py-2 rounded w-fit flex items-center gap-4 text-sm font-semibold cursor-pointer relative text-gray-700"
          onClick={() => setShoDays(!showDays)}
        >
          <svg
            width="20"
            height="20"
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
          Seleccionar Fecha
        </div>
        {showDays &&
          (selectedOption == 0 ||
            selectedOption == 1 ||
            selectedOption == 2) && (
            <>
              <div className="min-w-full w-[250%] absolute top-full left-0 bg-white border rounded flex  items-center gap-4 p-2">
                <div className="flex flex-col gap-4 text-start w-fit">
                  {options.map((o, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedOption(i)}
                      className={`text-start px-4 py-2 rounded-full ${
                        selectedOption == i &&
                        "bg-yellow-200 text-yellow-900 hover:border-transparent"
                      } font-medium w-40 hover:border-gray-300 transition-all border border-transparent`}
                    >
                      {o}
                    </button>
                  ))}
                </div>

                <div>
                  <div className="flex justify-between items-center py-2 font-semibold text-lg text-yellow-800">
                    <button onClick={() => handleBackMonth()}>
                      <svg
                        width="25"
                        height="25"
                        viewBox="0 0 24 24"
                        className="text-gray-600"
                      >
                        <path
                          fill="currentColor"
                          d="m8.82 12l7.715 7.716q.22.22.218.528t-.224.529q-.221.221-.529.221t-.529-.221L7.83 13.136q-.243-.242-.354-.54q-.112-.298-.112-.596t.112-.596t.354-.54l7.64-7.644q.221-.221.532-.218q.31.003.531.224t.222.529t-.222.528z"
                        />
                      </svg>
                    </button>
                    <h1 onClick={() => setSelectedOption(3)}>
                      {months[month]} {year}
                    </h1>
                    <button onClick={() => handleNextMonth()}>
                      <svg
                        width="25"
                        height="25"
                        viewBox="0 0 24 24"
                        className="rotate-180 text-gray-600"
                      >
                        <path
                          fill="currentColor"
                          d="m8.82 12l7.715 7.716q.22.22.218.528t-.224.529q-.221.221-.529.221t-.529-.221L7.83 13.136q-.243-.242-.354-.54q-.112-.298-.112-.596t.112-.596t.354-.54l7.64-7.644q.221-.221.532-.218q.31.003.531.224t.222.529t-.222.528z"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="grid grid-cols-7 justify-items-center w-full gap-y-1 border border-t-0">
                    {week.map((w, i) => (
                      <p
                        key={i}
                        className={`w-full text-center p-2 border-y font-semibold text-yellow-900`}
                      >
                        {w}
                      </p>
                    ))}
                    {calendar.map((d, i) => (
                      <p
                        key={i}
                        onMouseDown={() => handleMouseDown(d)}
                        onMouseEnter={() => handleMouseEnter(d)}
                        onMouseUp={handleMouseUp}
                        onClick={() => handleSetDay(d.dia, d.mes, d.year)}
                        className={`hover:bg-yellow-200 hover:text-gray-950 cursor-pointer text-center transition-all  flex items-center justify-center aspect-square rounded-full w-10 h-10 ${
                          handleIsSelected(d) && "bg-yellow-300"
                        } 
                 
                    ${
                      selectedOption == 1 &&
                      i >=
                        calendar.findIndex(
                          (c) => c.dia == day && c.mes == month
                        ) -
                          6 &&
                      i <=
                        calendar.findIndex(
                          (c) => c.dia == day && c.mes == month
                        ) &&
                      "bg-yellow-300"
                    } 

                    ${
                      selectedOption == 2 &&
                      calendar[i].mes == month &&
                      "bg-yellow-300"
                    }

                   `}
                      >
                        {d.dia}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

        {showDays && selectedOption == 3 && (
          <div className="min-w-full w-[150%] absolute top-full left-0 bg-white border rounded gap-2 p-2  grid grid-cols-2 shadow justifyitemc">
            {months.map((m, i) => (
              <button
                onClick={() => {
                  handleSetMonth(i);
                  setSelectedOption(0);
                }}
                key={i}
                className={`border py-2 rounded font-medium hover:bg-yellow-200 transition-all text-gray-700 hover:text-yellow-950 active:scale-90 w-28 border-transparent ${
                  m == months[month] && "bg-yellow-200 text-yellow-900"
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
