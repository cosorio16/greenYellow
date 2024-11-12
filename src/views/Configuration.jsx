import Header from "../components/Header";
import Cardconf from "../components/Cardconf";

function Configuration() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header></Header>
      <main className="px-4 py-8 flex justify-center grow bg-gray-50 pt-24">
        <Cardconf></Cardconf>
      </main>
    </div>
  );
}

export default Configuration;
