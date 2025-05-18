import Header from "../components/Header";
import Cardnav from "../components/Cardnav";

function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header></Header>
      <main className="p-4 lg:p-10 flex flex-col gap-4 bg-gray-100 h-full grow pt-24">
        <h1 className="flex items-center gap-4 text-4xl font-light">
          <svg width="35" height="35" viewBox="0 0 24 24">
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.5"
              d="m19 12.232l.955-.955C21.318 9.913 22 9.23 22 8.384s-.682-1.529-2.045-2.892l-1.447-1.447C17.145 2.682 16.463 2 15.616 2c-.848 0-1.53.682-2.893 2.045l-8.678 8.678C2.682 14.087 2 14.768 2 15.616s.682 1.529 2.045 2.892l1.447 1.447C6.855 21.318 7.537 22 8.384 22s1.53-.682 2.893-2.045L16.232 15M8.464 8.464L9.88 9.88m2.827-5.658l1.414 1.414m-9.899 7.071l1.414 1.414m.707-3.535l2.122 2.121m2.121-6.364l2.121 2.121"
            />
          </svg>
          Medición
        </h1>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 grow">
          <Cardnav floorName={"Piso 5"} floorCard={5}></Cardnav>
          <Cardnav floorName={"Piso 7"} floorCard={7}></Cardnav>
        </div>
      </main>
    </div>
  );
}

export default Home;
