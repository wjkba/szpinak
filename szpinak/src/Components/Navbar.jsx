import { Link } from "react-router-dom";
import { useState } from "react";
import MenuModal from "./MenuModal";

function Navbar() {
  const [isMenu, setIsMenu] = useState(false);
  function handleToggleMenu() {
    setIsMenu((m) => !m);
    console.log(isMenu);
  }

  return (
    <>
      {isMenu && (
        <MenuModal handleToggleMenu={handleToggleMenu} isMenu={isMenu} />
      )}
      <div className="flex w-full justify-between items-center p-4 bg-szpgray">
        <Link to={"/"} className="flex gap-2 items-center">
          <img src="/images/icon-spinach.png" alt="" />
          <p className="text-lg font-semibold">szpinak</p>
        </Link>
        <div onClick={handleToggleMenu} className="cursor-pointer">
          <i className="fa-solid fa-bars fa-lg"></i>
        </div>
      </div>
    </>
  );
}

export default Navbar;
