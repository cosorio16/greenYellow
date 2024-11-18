import React, {
  useState,
  useMemo,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";

const Calendar = forwardRef((props, ref) => {
  const [showDays, setShoDays] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selected, setSelected] = useState([{}]);
  const [isSelected, setIsSelected] = useState(false);
  const [start, setStart] = useState(null);

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

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const desfase = new Date(year, month, 1).getDay();

  useEffect(() => {
    setSelected([
      {
        year: currentDate.getFullYear(),
        mes: currentDate.getMonth(),
        dia: currentDate.getDate(),
      },
    ]);
  }, [currentDate]);

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

  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const handleBackMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleSetMonth = (i) => setCurrentDate(new Date(year, i, 1));

  const handleMouseDown = (date) => {
    setIsSelected(true);
    setStart(date);
    setSelected([date]);
    props.onDateSelect?.([date]);
  };

  const handleMouseEnter = (date) => {
    if (isSelected && start) {
      const range = [start, date].sort(
        (a, b) =>
          new Date(a.year, a.mes, a.dia) - new Date(b.year, b.mes, b.dia)
      );
      const datesSelecteds = [];
      let current = new Date(range[0].year, range[0].mes, range[0].dia);
      const end = new Date(range[1].year, range[1].mes, range[1].dia);

      while (current <= end) {
        datesSelecteds.push({
          year: current.getFullYear(),
          mes: current.getMonth(),
          dia: current.getDate(),
        });
        current.setDate(current.getDate() + 1);
      }

      setSelected(datesSelecteds);
      props.onDateSelect?.(datesSelecteds);
    }
  };

  const handleMouseUp = () => {
    setIsSelected(false);
    setShoDays(false);
    props.mouseUp?.(isSelected);
  };

  useImperativeHandle(ref, () => ({
    getCurrentDate: () => currentDate,
    getSelectedDates: () => selected,
    reset: () => {
      setCurrentDate(new Date());
      setSelected([]);
    },
  }));

  const handleIsSelected = (date) =>
    selected.some(
      (s) => s.year === date.year && s.mes === date.mes && s.dia === date.dia
    );

  return (
    <div className="relative w-fit">
      <div
        className="border-b px-4 py-2 rounded w-fit flex items-center gap-4 text-sm font-semibold cursor-pointer relative text-gray-700"
        onClick={() => setShoDays(!showDays)}
      >
        {selected.length > 1
          ? `${selected[0]?.dia} ${months[selected[0]?.mes]}, ${
              selected[0]?.year
            } - ${selected[selected.length - 1].dia} ${
              months[selected[selected.length - 1].mes]
            }, ${selected[selected.length - 1].year}`
          : `${selected[0]?.dia} ${months[selected[0]?.mes]}, ${
              selected[0]?.year
            }`}
      </div>

      {showDays && (
        <div className="w-[270px]  absolute top-full left-0 bg-white border rounded flex items-center gap-4 justify-center flex-col px-4 py-2">
          <div className="flex items-center gap-2 justify-between w-full">
            <button onClick={handleBackMonth}>{"<"}</button>
            <h1>
              {months[month]} {year}
            </h1>
            <button onClick={handleNextMonth}>{">"}</button>
          </div>

          <div className="grid grid-cols-7 m-auto justify-items-center  border">
            {week.map((w, i) => (
              <p key={i} className=" w-full text-center border-b ">
                {w}
              </p>
            ))}
            {calendar.map((d, i) => (
              <p
                key={i}
                onMouseDown={() => handleMouseDown(d)}
                onMouseEnter={() => handleMouseEnter(d)}
                onMouseUp={handleMouseUp}
                className={`${
                  handleIsSelected(d) && "bg-yellow-300"
                } aspect-square rounded-full flex items-center justify-center w-5 h-5 m-1 p-4 hover:bg-yellow-200 cursor-pointer`}
              >
                {d.dia}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

export default Calendar;
Calendar.displayName = "Calendar";
