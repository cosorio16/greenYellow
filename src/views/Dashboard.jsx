import { useState, useEffect } from "react";
import data from "../data/direction";
import { Chart as ChartJS } from "chart.js/auto";
import { Line, Bar } from "react-chartjs-2";

function Dashboard() {
  const [sensores, setSensores] = useState([]);

  const medidor1 = [];
  const medidor2 = [];
  const medidor3 = [];
  const medidor4 = [];

  Object.values(data).map((d) => {
    if (d.name.split("-").includes("M1")) {
      medidor1.push(d);
    } else if (d.name.split("-").includes("M2")) {
      medidor2.push(d);
    } else if (d.name.split("-").includes("M3")) {
      medidor3.push(d);
    } else if (d.name.split("-").includes("M4")) {
      medidor4.push(d);
    }
  });

  useEffect(() => {
    const s = [
      "Medidor 1",
      "Medidor 2",
      "Sensor 1",
      "Sensor 2",
      "Sensor 3",
      "Sensor 7",
    ];
    setSensores(s);
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <select name="" id="" className="self-end w-52 p-2 border">
        {sensores.map((s, index) => (
          <option key={index} value={s}>
            {s}
          </option>
        ))}
      </select>
      <div className="w-[50%] h-auto">
        <Line
          data={{
            labels: [
              
            ],
            datasets: [
              { label: "Energia Total", data: [67, 80, 57, 47, 57, 47, 67] },
              { label: "Energia Total 2", data: [27, 40, 57, 57, 57, 47, 27] },
            ],
          }}
        ></Line>
      </div>
    </div>
  );
}

export default Dashboard;
