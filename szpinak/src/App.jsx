import { useState } from "react";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <div className=" grid place-items-center">
        <Home />
      </div>
    </>
  );
}

export default App;
