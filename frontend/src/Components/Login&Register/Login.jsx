/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import Navbar from "../Navbar";
export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { setIsLoggedIn } = useAuth();
  useEffect(() => {
    setIsLoading(true);
    checkIfLoggedIn();
  }, []);

  async function checkIfLoggedIn() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://127.0.0.1:8000/verify-token/${token}`
      );
      if (response.data.message === "verified") {
        setIsLoggedIn(true);
        setTimeout(() => {
          navigate("/account");
        }, 500);
      }
      setIsLoading(false);
    } catch (error) {
      console.log("please log in");
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-offwhite">
      <Navbar />

      {!isLoading ? (
        <div className="grid place-items-center  lg:mt-[6rem]">
          <div className=" rounded gird place-content-center  w-full  p-4">
            <div className="grid place-items-center ">
              <LoginForm />
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
