import Headernav from "../components/Headernav";
import Test from "../charts/Test";
import Voltajes from "../charts/Voltajes";
import Current from "../charts/Current";
import Factor from "../charts/Factor";
import Potency from "../charts/Potency";
import Energy from "../charts/Energy";
import EnergyConsumed from "../charts/EnergyConsumed";

function Chartview() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* <Headernav></Headernav> */}
      <main className="flex flex-col bg-gray-100 grow pt-40 p-5">
        <div className="flex flex-col gap-4 w-full">
          <div className="flex justify-between items-center w-full"></div>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-2 justify-items-center border-2 p-2 bg-white w-full] rounded-lg justify-center">
            <div className="aspect-auto max-w-[1200px] w-full border p-4">
              <Energy></Energy>
            </div>
            <div className="aspect-auto max-w-[1200px] w-full border p-4">
              <EnergyConsumed></EnergyConsumed>
            </div>
            <div className="aspect-auto max-w-[1200px] w-full border p-4">
              <Voltajes></Voltajes>
            </div>
            <div className="aspect-auto max-w-[1200px] w-full border p-4">
              <Current></Current>
            </div>
            <div className="aspect-auto max-w-[1200px] w-full border p-4">
              <Factor></Factor>
            </div>
            <div className="aspect-auto max-w-[1200px] w-full border p-4">
              <Potency></Potency>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Chartview;
