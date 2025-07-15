import { Outlet } from "react-router";
import Routes from "./modules/routes";

function App() {
  return (
    <>
      <Routes />
      <Outlet />
    </>
  );
}

export default App;
