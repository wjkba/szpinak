import Navbar from "./Navbar";
import { RiBookmarkLine } from "react-icons/ri";
import { RiFilePaperLine } from "react-icons/ri";
import { RiFileAddLine } from "react-icons/ri";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Account() {
  const { setIsLoggedIn, isLoggedIn } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  function checkIfLoggedIn() {
    if (!isLoggedIn) {
      navigate("/login");
      return false;
    }
    setIsLoading(false);
  }
  return (
    <>
      <Navbar />
      <div className="grid place-items-center ">
        <div className="w-full lg:max-w-[1300px] max-w-[450px] px-4 py-[40px] lg:px-[120px] lg:py-[80px]">
          {!isLoading ? (
            <div>
              <div className="font-medium gap-2 flex items-center p-4 border-b-2 border-[#E1E1E1]">
                <RiBookmarkLine size={25} />
                <p>Saved recipes</p>
              </div>
              <div className="font-medium gap-2 flex items-center p-4 border-b-2 border-[#E1E1E1]">
                <RiFilePaperLine size={25} />
                <p>My recipes</p>
              </div>
              <div className="font-medium gap-2 flex items-center p-4 border-b-2 border-[#E1E1E1]">
                <RiFileAddLine size={25} />
                <p>Add a recipe</p>
              </div>
              <div
                onClick={() => logout()}
                className="font-medium gap-2 flex items-center p-4 cursor-pointer"
              >
                <p>Logout</p>
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
    navigate("/");
  }
}
