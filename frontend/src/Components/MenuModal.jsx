import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../Context/AuthContext";

export default function MenuModal({ handleToggleMenu }) {
  const { isLoggedIn } = useAuth();
  return (
    <div className=" top-0 fixed z-50 w-screen h-screen bg-szpgray">
      <div className="mb-12">
        <div className="flex w-full justify-between items-center p-4 bg-szpgray">
          <div className="flex gap-2 items-center">
            <img src="/images/icon-spinach.png" alt="" />
            <p className="text-lg font-semibold">szpinak</p>
          </div>
          <div onClick={handleToggleMenu} className="cursor-pointer">
            <i className="fa-solid fa-x fa-lg"></i>
          </div>
        </div>
      </div>
      <div className="first-letter:">
        <div className="grid place-items-center gap-6 text-3xl">
          <Link to="/recipes" className="hover:font-medium cursor-pointer">
            recipes
          </Link>
          {/* <p className="hover:font-medium cursor-pointer">popular</p> */}
          <Link to="/about" className="hover:font-medium cursor-pointer">
            about
          </Link>
          <Link to="/login" className="hover:font-medium cursor-pointer">
            {isLoggedIn ? "account" : "login"}
          </Link>
        </div>
      </div>
    </div>
  );
}

MenuModal.propTypes = {
  handleToggleMenu: PropTypes.func,
  isMenu: PropTypes.bool,
};
