import Aside from "./Components/Aside";
import Header from "./Components/Header";
import Dashboard from "./views/Dashboard";
import data from "./data/direction";
import trendsData from "./data/trends";
import { useEffect } from "react";

function App() {
  console.log(trendsData.filter((f) => f.id == 243));

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

  // Object.values(data).map((d) => {
  //   if (d.name.split("-").includes(" S1")) {
  //     console.log(d.name);
  //   } else if (d.name.split("-").includes(" S2")) {
  //     console.log(d.name);
  //   } else if (d.name.split("-").includes(" S3")) {
  //     console.log(d.name);
  //   } else if (d.name.split("-").includes(" S4")) {
  //     console.log(d.name);
  //   } else if (d.name.split("-").includes(" S5")) {
  //     console.log(d.name);
  //   } else if (d.name.split("-").includes(" S6")) {
  //     console.log(d.name);
  //   } else if (d.name.split("-").includes(" S7")) {
  //     console.log(d.name);
  //   } else if (d.name.split("-").includes(" S8")) {
  //     console.log(d.name);
  //   }
  // });

  return (
    <div className="flex">
      <Aside></Aside>
      <main className="grow flex flex-col">
        <Header></Header>
        <section className="p-4 w-full grow">
          <Dashboard></Dashboard>
        </section>
      </main>
    </div>
  );
}

export default App;
