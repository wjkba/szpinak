import { Link } from "react-router-dom";
import { useState } from "react";
import MenuModal from "./MenuModal";

function Navbar() {
  const [isMenu, setIsMenu] = useState(false);
  function handleToggleMenu() {
    setIsMenu((m) => !m);
  }

  return (
    <>
      {isMenu && (
        <MenuModal handleToggleMenu={handleToggleMenu} isMenu={isMenu} />
      )}
      <div className="grid place-items-center p-4 bg-szpgray">
        <div className="flex w-full justify-between items-center max-w-[720px]">
          <Link to={"/"} className="flex gap-2 items-center">
            <img src="/images/icon-spinach.png" alt="" />
            <p className="text-lg font-semibold">szpinak</p>
          </Link>
          <div onClick={handleToggleMenu} className="lg:hidden cursor-pointer">
            <i className="fa-solid fa-bars fa-lg"></i>
          </div>
          <div className="hidden text-xl lg:flex gap-4">
            <Link to="/recipes" className="hover:font-medium cursor-pointer">
              recipes
            </Link>
            {/* <p className="hover:font-medium cursor-pointer">popular</p> */}
            <Link to="/about" className="hover:font-medium cursor-pointer">
              about
            </Link>
            <Link to="/login" className="hover:font-medium cursor-pointer">
              login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
