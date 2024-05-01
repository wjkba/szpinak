// to jest placeholder
// todo:
//   - napraw css
//   - nie dodawaj register dopoki nie skonczys css

import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import LoginForm from "./LoginForm";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
//   - skopiuj login na register
export default function Login() {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    checkTokenStatus();
  }, []);

  async function checkTokenStatus() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://127.0.0.1:8000/verify-token/${token}`
      );
      if (response.data.message === "verified") {
        setIsLoggedIn(true);
      }
      setIsLoading(false);
    } catch (error) {
      console.log("please log in");
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="lg:text-lg">
        <div className="lg:py-5 lg:px-0 h-[64px] grid place-items-center p-4 bg-szpgray">
          <div className="w-full lg:px-[120px] flex  justify-between  items-center max-w-[1300px]">
            <button
              onClick={() => navigate(-1)}
              className="flex gap-2 items-center"
            >
              <div className="bg-white rounded p-1  flex justify-center min-w-[5rem]">
                <FaArrowLeftLong size={20} />
              </div>
            </button>
          </div>
        </div>

        {!isLoading ? (
          <div className="grid place-items-center bg-szpgray mt-[6rem]">
            <div className=" rounded gird place-content-center  w-full bg-white p-4">
              <div className="grid place-items-center">
                <div className="mb-8">
                  <img src="/images/szpinak-logo-login.png" alt="" />
                </div>
                <LoginForm />
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
}
