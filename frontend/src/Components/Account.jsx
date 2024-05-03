/* eslint-disable react-hooks/exhaustive-deps */
import Navbar from "./Navbar";
import { RiBookmarkLine } from "react-icons/ri";
import { RiFilePaperLine } from "react-icons/ri";
import { RiFileAddLine } from "react-icons/ri";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useAuth } from "../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Account() {
  const { setIsLoggedIn } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const checkIfLoggedIn = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://127.0.0.1:8000/verify-token/${token}`
      );
      if (response.data.message === "verified") {
        setUsername(response.data.username);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoggedIn(false);
      navigate("/login");
    }
  };

  return (
    <>
      <Navbar />
      <div className="grid place-items-center ">
        <div className="w-full lg:max-w-[1300px] max-w-[450px] px-4 py-[40px] lg:px-[120px] lg:py-[80px]">
          {!isLoading ? (
            <div>
              <div className=" flex gap-4 mb-6 items-center">
                <div
                  className={`${
                    isImageLoaded ? "hidden" : "visible"
                  } bg-[#F4F4F4] min-h-[3.5rem]  rounded-full min-w-[3.5rem]`}
                ></div>
                <img
                  className={`${
                    isImageLoaded ? "visible" : "hidden"
                  } max-w-[3.5rem]`}
                  src="https://avatar.iran.liara.run/public"
                  alt=""
                  onLoad={handleImageLoad}
                />
                <div>
                  <p className="text-3xl ">{username}</p>
                  <div
                    className="flex gap-2 items-center cursor-pointer text-gray-800 hover:text-red-500"
                    onClick={() => logout()}
                  >
                    <RiLogoutBoxLine />
                    <p>logout</p>
                  </div>
                </div>
              </div>
              <div className="lg:max-w-[25rem]">
                <Link
                  to="/saved"
                  className="hover:text-white hover:bg-szppurple font-medium gap-2 flex items-center p-4 border-b-2 border-[#E1E1E1]"
                >
                  <RiBookmarkLine size={25} />
                  <p>Saved recipes</p>
                </Link>
                <Link
                  to="/my-recipes"
                  className="hover:text-white hover:bg-szppurple font-medium gap-2 flex items-center p-4 border-b-2 border-[#E1E1E1]"
                >
                  <RiFilePaperLine size={25} />
                  <p>My recipes</p>
                </Link>
                <Link
                  to="/add"
                  className="hover:text-white hover:bg-szppurple font-medium gap-2 flex items-center p-4 border-b-2 border-[#E1E1E1]"
                >
                  <RiFileAddLine size={25} />
                  <p>Add a recipe</p>
                </Link>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </>
  );

  function logout() {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  }
}
