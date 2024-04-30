import { useState } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import RegisterForm from "./RegisterForm";

export default function Register() {
  const [message, setMessage] = useState("default");
  const [color, setColor] = useState("bg-yellow-200");
  const navigate = useNavigate();

  return (
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

      <div className="grid place-items-center bg-szpgray mt-[6rem]">
        <div className=" rounded gird place-content-center  w-full bg-white p-4">
          <div className="grid place-items-center">
            <div className="mb-8">
              <img src="/images/szpinak-logo-login.png" alt="" />
            </div>
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );

  function placeholderHandleLogin() {
    if (username === "user" && password === "123") {
      setMessage((m) => "success");
      setColor((c) => "bg-green-200");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      setMessage((m) => (m = "error"));
      setColor((c) => (c = "bg-red-200"));
      setTimeout(() => {
        setMessage((m) => "default");
        setColor((c) => "bg-yellow-200");
      }, 1500);
    }
  }
}

function Message({ msg, color }) {
  if (msg === "default") {
    return (
      <div className={`${color} grid  min-h-[3rem]`}>
        <p>login: user</p>
        <p>password: 123</p>
      </div>
    );
  } else {
    return (
      <div className={`${color} min-h-[3rem] grid place-items-center`}>
        {msg}
      </div>
    );
  }
}
