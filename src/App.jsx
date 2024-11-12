import Home from "./views/Home";
import Configuration from "./views/Configuration";
import Meterview from "./views/Meterview";
import Chartview from "./views/Chartview";
import useData from "./store/dataState";

function App() {
  const { view } = useData();

  return (
    <>
      {view == 0 && <Home></Home>}
      {view == 1 && <Configuration></Configuration>}
      {view == 2 && <Meterview></Meterview>}
      {view == 3 && <Chartview></Chartview>}
    </>
  );
}

export default App;
