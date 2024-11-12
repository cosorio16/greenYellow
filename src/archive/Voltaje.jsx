import useData from "../store/dataState";
import trends from "../data/trends";
import { useState, useEffect } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import data from "../data/fetch";
import Calendar from "../components/Calendar";

function Voltaje() {
  const { floor } = useData();

  const days = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
  ];

  const times = [
    "00:05",
    "00:10",
    "00:15",
    "00:20",
    "00:25",
    "00:30",
    "00:35",
    "00:40",
    "00:45",
    "00:50",
    "00:55",
    "01:00",
    "01:05",
    "01:10",
    "01:15",
    "01:20",
    "01:25",
    "01:30",
    "01:35",
    "01:40",
    "01:45",
    "01:50",
    "01:55",
    "02:00",
    "02:05",
    "02:10",
    "02:15",
    "02:20",
    "02:25",
    "02:30",
    "02:35",
    "02:40",
    "02:45",
    "02:50",
    "02:55",
    "03:00",
    "03:05",
    "03:10",
    "03:15",
    "03:20",
    "03:25",
    "03:30",
    "03:35",
    "03:40",
    "03:45",
    "03:50",
    "03:55",
    "04:00",
    "04:05",
    "04:10",
    "04:15",
    "04:20",
    "04:25",
    "04:30",
    "04:35",
    "04:40",
    "04:45",
    "04:50",
    "04:55",
    "05:00",
    "05:05",
    "05:10",
    "05:15",
    "05:20",
    "05:25",
    "05:30",
    "05:35",
    "05:40",
    "05:45",
    "05:50",
    "05:55",
    "06:00",
    "06:05",
    "06:10",
    "06:15",
    "06:20",
    "06:25",
    "06:30",
    "06:35",
    "06:40",
    "06:45",
    "06:50",
    "06:55",
    "07:00",
    "07:05",
    "07:10",
    "07:15",
    "07:20",
    "07:25",
    "07:30",
    "07:35",
    "07:40",
    "07:45",
    "07:50",
    "07:55",
    "08:00",
    "08:05",
    "08:10",
    "08:15",
    "08:20",
    "08:25",
    "08:30",
    "08:35",
    "08:40",
    "08:45",
    "08:50",
    "08:55",
    "09:00",
    "09:05",
    "09:10",
    "09:15",
    "09:20",
    "09:25",
    "09:30",
    "09:35",
    "09:40",
    "09:45",
    "09:50",
    "09:55",
    "10:00",
    "10:05",
    "10:10",
    "10:15",
    "10:20",
    "10:25",
    "10:30",
    "10:35",
    "10:40",
    "10:45",
    "10:50",
    "10:55",
    "11:00",
    "11:05",
    "11:10",
    "11:15",
    "11:20",
    "11:25",
    "11:30",
    "11:35",
    "11:40",
    "11:45",
    "11:50",
    "11:55",
    "12:00",
    "12:05",
    "12:10",
    "12:15",
    "12:20",
    "12:25",
    "12:30",
    "12:35",
    "12:40",
    "12:45",
    "12:50",
    "12:55",
    "13:00",
    "13:05",
    "13:10",
    "13:15",
    "13:20",
    "13:25",
    "13:30",
    "13:35",
    "13:40",
    "13:45",
    "13:50",
    "13:55",
    "14:00",
    "14:05",
    "14:10",
    "14:15",
    "14:20",
    "14:25",
    "14:30",
    "14:35",
    "14:40",
    "14:45",
    "14:50",
    "14:55",
    "15:00",
    "15:05",
    "15:10",
    "15:15",
    "15:20",
    "15:25",
    "15:30",
    "15:35",
    "15:40",
    "15:45",
    "15:50",
    "15:55",
    "16:00",
    "16:05",
    "16:10",
    "16:15",
    "16:20",
    "16:25",
    "16:30",
    "16:35",
    "16:40",
    "16:45",
    "16:50",
    "16:55",
    "17:00",
    "17:05",
    "17:10",
    "17:15",
    "17:20",
    "17:25",
    "17:30",
    "17:35",
    "17:40",
    "17:45",
    "17:50",
    "17:55",
    "18:00",
    "18:05",
    "18:10",
    "18:15",
    "18:20",
    "18:25",
    "18:30",
    "18:35",
    "18:40",
    "18:45",
    "18:50",
    "18:55",
    "19:00",
    "19:05",
    "19:10",
    "19:15",
    "19:20",
    "19:25",
    "19:30",
    "19:35",
    "19:40",
    "19:45",
    "19:50",
    "19:55",
    "20:00",
    "20:05",
    "20:10",
    "20:15",
    "20:20",
    "20:25",
    "20:30",
    "20:35",
    "20:40",
    "20:45",
    "20:50",
    "20:55",
    "21:00",
    "21:05",
    "21:10",
    "21:15",
    "21:20",
    "21:25",
    "21:30",
    "21:35",
    "21:40",
    "21:45",
    "21:50",
    "21:55",
    "22:00",
    "22:05",
    "22:10",
    "22:15",
    "22:20",
    "22:25",
    "22:30",
    "22:35",
    "22:40",
    "22:45",
    "22:50",
    "22:55",
    "23:00",
    "23:05",
    "23:10",
    "23:15",
    "23:20",
    "23:25",
    "23:30",
    "23:35",
    "23:40",
    "23:45",
    "23:50",
    "23:55",
    "24:00",
  ];

  const month = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];

  const [rangeSelect, setRangeSelect] = useState(times);
  // const [optionsCharts, setOptionsCharts] = useState({});
  const [daysMoth, setDayMonth] = useState(month);

  const today = new Date();
  const todayWeek = today.getDay();
  const todayDay = today.getDate();
  const todayMonth = today.getMonth() + 1;

  const pastWeek = new Date(today);
  pastWeek.setDate(today.getDate() - 7);

  const pastWeekDay = pastWeek.getDate();
  const pastWeekMonth = pastWeek.getMonth() + 1;
  const [week, setWeek] = useState(days);

  // const options = {
  //   scales: {
  //     x: {
  //       ticks: {
  //         callback: function (value, index) {
  //           return index % 3 === 0 ? times[index] : "";
  //         },
  //       },
  //     },
  //   },
  // };

  // const diasEnMes = new Date(2024, 0 + 1, 0).getDate();

  // const diasDelMes = [];
  // for (let i = 1; i <= diasEnMes; i++) {
  //   diasDelMes.push(i);
  // }

  useEffect(() => {
    if (rangeSelect == "Dia") {
      setRangeSelect(times);
    } else if (rangeSelect == "Semana") {
      setRangeSelect(week);
    } else if (rangeSelect == "Mes") {
      setRangeSelect(daysMoth);
    }
  }, [rangeSelect]);

  const piso5 = ["1/0/1", "1/0/11", "1/0/21"];
  const piso7 = ["1/0/3", "1/0/13", "1/0/23"];

  const [pisoSelected, setPisoSelected] = useState(piso5);

  useEffect(() => {
    floor == "5" ? setPisoSelected(piso5) : setPisoSelected(piso7);
  }, [floor]);

  const [voltajes, setVoltajes] = useState([]);
  const [voltajes2, setVoltajes2] = useState([]);
  const [voltajes3, setVoltajes3] = useState([]);

  const getMeterData = async (gp) => {
    const id = trends.filter((t, index) => t.object == localbus.encodega(gp))[0]
      .id;

    const bodyData = {
      dates_curr: {
        start: {
          year: 2024,
          day: 5,
          month: 11,
        },
        end: {
          year: 2024,
          day: 6,
          month: 11,
        },
      },
      id: id,
      dates_prev: {
        start: {
          year: 2024,
          day: 22,
          month: 10,
        },
        end: {
          year: 2024,
          day: 23,
          month: 10,
        },
      },
    };

    try {
      const response = await fetch(
        "http://192.168.0.110/scada-vis/trends/fetch",
        {
          headers: {
            accept: "application/json, text/javascript, */*; q=0.01",
            "accept-language": "es-419,es;q=0.9",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "x-requested-with": "XMLHttpRequest",
            cookie:
              "user_language=; x-logout=0; x-auth=; x-fail-cnt=0; x-login=1",
            Referer: "http://192.168.0.105/scada-vis/trends?id=1&mode=day",
            "Referrer-Policy": "strict-origin-when-cross-origin",
          },
          body: `data=${encodeURIComponent(JSON.stringify(bodyData))}`,
          method: "POST",
        }
      );

      const data = await response.json();

      if (response.ok) {
        return data;
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateChart = async () => {
    try {
      const [r1, r2, r3] = await Promise.all([
        getMeterData(pisoSelected[0]),
        getMeterData(pisoSelected[1]),
        getMeterData(pisoSelected[2]),
      ]);

      setVoltajes(r1.current.data);
      setVoltajes2(r2.current.data);
      setVoltajes3(r3.current.data);

      console.log("R", r1, r2, r3);
      console.log("R", r1.current.data, r2.current.data, r3.current.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setWeek([...days.slice(todayWeek), ...days.slice(0, todayWeek)]);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <Calendar></Calendar>
      </div>
      <Line
        data={{
          labels: rangeSelect,
          datasets: [
            {
              label: ["Voltaje L1"],
              data: data.m1,
              fill: "origin",
            },
            {
              label: ["Voltaje L2"],
              data: data.m2,
              fill: "origin",
            },
            {
              label: ["Voltaje L3"],
              data: data.m3,
              fill: "origin",
            },
          ],
        }}
        options={{
          responsive: true,
          interaction: {
            mode: "index",
            intersect: false,
          },
        }}
      ></Line>
      <button className="border px-4 py-2 text-white bg-gray-800 hover:scale-105 transition-all m-auto rounded">
        Descargar Datos
      </button>
    </div>
  );
}

export default Voltaje;
