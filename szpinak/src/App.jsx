import { useState } from "react";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import "./App.css";
import MenuModal from "./Components/MenuModal";

function App() {
  const [isMenu, setIsMenu] = useState(false);
  function handleToggleMenu() {
    setIsMenu((m) => !m);
    console.log(isMenu);
  }
  return (
    <>
      <Navbar handleToggleMenu={handleToggleMenu} />
      {isMenu && (
        <MenuModal handleToggleMenu={handleToggleMenu} isMenu={isMenu} />
      )}
      <div className=" grid  place-items-center">
        <Home />
      </div>
    </>
  );
}

export default App;
