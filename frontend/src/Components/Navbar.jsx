import { Link } from "react-router-dom";
import { useState } from "react";
import MenuModal from "./MenuModal";
import { FaRegUser } from "react-icons/fa";
import { useAuth } from "../Context/AuthContext";

function Navbar({ color = "szpgray" }) {
  const [isMenu, setIsMenu] = useState(false);
  const { isLoggedIn } = useAuth();
  function handleToggleMenu() {
    setIsMenu((m) => !m);
  }

  return (
    <>
      {isMenu && (
        <MenuModal handleToggleMenu={handleToggleMenu} isMenu={isMenu} />
      )}
      <div
        className={`lg:py-4 lg:px-0 grid place-items-center p-4 bg-${color}`}
      >
        <div className="w-full lg:px-[120px] flex  justify-between  items-center max-w-[1300px]">
          <Link to={"/"} className="flex gap-2 items-center">
            <img src="/images/icon-spinach.png" alt="" />
            <p className="lg:text-2xl text-lg font-semibold">szpinak</p>
          </Link>
          <div onClick={handleToggleMenu} className="lg:hidden cursor-pointer">
            <i className="fa-solid fa-bars fa-lg"></i>
          </div>
          <div className="hidden text-xl lg:flex items-center gap-8">
            <Link to="/recipes" className="hover:font-medium cursor-pointer">
              recipes
            </Link>
            {/* <p className="hover:font-medium cursor-pointer">popular</p> */}
            <Link to="/about" className="hover:font-medium cursor-pointer">
              about
            </Link>
            <Link
              to={isLoggedIn ? "/account" : "/login"}
              className="hover:font-medium cursor-pointer"
            >
              <FaRegUser className="min-w-[2rem]" size={20} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
