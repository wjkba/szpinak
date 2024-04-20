// to jest placeholder
// todo:
//   - napraw css
//   - nie dodawaj register dopoki nie skonczys css

import { useState } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";

//   - skopiuj login na register
export default function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState("default");
  const [color, setColor] = useState("bg-yellow-200");
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="lg:text-lg">
      <div className="flex w-full justify-between items-center p-4 pl-0 bg-szpgray">
        <button
          className="bg-szpgray min-w-[5rem] rounded cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <i className="fa-solid fa-arrow-left"></i>
        </button>
      </div>

      <div className="grid place-items-center bg-szpgray mt-[6rem]">
        <div className=" rounded gird place-content-center  w-full bg-white p-4">
          <div className="grid place-items-center">
            <div className="mb-8">
              <img src="/images/szpinak-logo-login.png" alt="" />
            </div>
            <form
              onSubmit={handleSubmit}
              className="grid gap-2 place-items-center lg:min-w-[20rem]"
            >
              <div className="grid gap-2 mb-4 w-full">
                <Message msg={message} color={color} />
                <input
                  className="bg-red p-1 w-full rounded border-2 border-[#214e9c]/14"
                  placeholder="Username"
                  onChange={handleUsernameChange}
                />
                <input
                  className="bg-red p-1 w-full rounded border-2 border-[#214e9c]/14"
                  type="password"
                  placeholder="Password"
                  onChange={handlePasswordChange}
                />
              </div>

              <button
                type="submit"
                onClick={placeholderHandleLogin}
                className="rounded p-2 bg-[#3F3D56] text-white w-full"
              >
                Login
              </button>
            </form>
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
