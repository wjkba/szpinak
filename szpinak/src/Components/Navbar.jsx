import { Link } from "react-router-dom";

function Navbar({ handleToggleMenu }) {
  return (
    <div className="">
      <div className="flex w-full justify-between items-center p-4 bg-szpgray">
        <Link to={"/"} className="flex gap-2 items-center">
          <img src="/images/icon-spinach.png" alt="" />
          <p className="text-lg font-semibold">szpinak</p>
        </Link>
        <div onClick={handleToggleMenu} className="cursor-pointer">
          <i className="fa-solid fa-bars fa-lg"></i>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
