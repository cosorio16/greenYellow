import Headernav from "../components/Headernav";
import Voltajes from "../charts/Voltajes";
import Current from "../charts/Current";
import Factor from "../charts/Factor";
import Potency from "../charts/Potency";
import Energy from "../charts/Energy";
import EnergyConsumed from "../charts/EnergyConsumed";
import Temperature from "../charts/Temperature";
import Humidity from "../charts/Humidity";
import Presencie from "../charts/Presencie";
import ComOrg from "../charts/ComOrg";
import CO2 from "../charts/CO2";
import useData from "../store/dataState";
import Lums from "../charts/Lumenes";

function Chartview() {
  const { subView, floor } = useData();

  const datamapping = {
    5: {
      0: 1,
      1: 2,
      2: 1,
      3: 2,
      4: 3,
      5: 7,
    },
    7: {
      0: 3,
      1: 4,
      2: 4,
      3: 5,
      4: 6,
      5: 8,
    },
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Headernav></Headernav>
      <main className="flex flex-col bg-gray-100 grow pt-40 p-5">
        <div className="flex flex-col gap-4 w-full">
          <div className="flex justify-between items-center w-full"></div>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-2 justify-items-center border-2 p-2 bg-white w-full] rounded-lg justify-center">
            {subView >= 0 && subView < 2 && (
              <>
                <div className="aspect-auto max-w-[1200px] w-full border p-4">
                  <Energy id={datamapping[floor][subView]}></Energy>
                </div>
                <div className="aspect-auto max-w-[1200px] w-full border p-4">
                  <Potency id={datamapping[floor][subView]}></Potency>
                </div>
                <div className="aspect-auto max-w-[1200px] w-full border p-4">
                  <Voltajes id={datamapping[floor][subView]}></Voltajes>
                </div>
                <div className="aspect-auto max-w-[1200px] w-full border p-4">
                  <Current id={datamapping[floor][subView]}></Current>
                </div>
                <div className="aspect-auto max-w-[1200px] w-full border p-4">
                  <EnergyConsumed
                    id={datamapping[floor][subView]}
                  ></EnergyConsumed>
                </div>
                <div className="aspect-auto max-w-[1200px] w-full border p-4">
                  <Factor id={datamapping[floor][subView]}></Factor>
                </div>
              </>
            )}
            {subView >= 2 && subView < 5 && (
              <>
                <div className="aspect-auto max-w-[1200px] w-full border p-4">
                  <ComOrg id={datamapping[floor][subView]}></ComOrg>
                </div>
                <div className="aspect-auto max-w-[1200px] w-full border p-4">
                  <Temperature id={datamapping[floor][subView]}></Temperature>
                </div>
                <div className="aspect-auto max-w-[1200px] w-full border p-4">
                  <Humidity id={datamapping[floor][subView]}></Humidity>
                </div>
                <div className="aspect-auto max-w-[1200px] w-full border p-4">
                  <Presencie id={datamapping[floor][subView]}></Presencie>
                </div>
                <div className="aspect-auto max-w-[1200px] w-full border p-4">
                  <CO2 id={datamapping[floor][subView]}></CO2>
                </div>
              </>
            )}
            {subView == 5 && (
              <>
                <div className="aspect-auto max-w-[1200px] w-full border p-4">
                  <Temperature id={datamapping[floor][subView]}></Temperature>
                </div>
                <div className="aspect-auto max-w-[1200px] w-full border p-4">
                  <Presencie id={datamapping[floor][subView]}></Presencie>
                </div>
                <div className="aspect-auto max-w-[1200px] w-full border p-4">
                  <Lums id={datamapping[floor][subView]}></Lums>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Chartview;
