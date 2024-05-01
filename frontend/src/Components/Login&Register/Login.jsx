// to jest placeholder
// todo:
//   - napraw css
//   - nie dodawaj register dopoki nie skonczys css

import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import LoginForm from "./LoginForm";

//   - skopiuj login na register
export default function Login() {
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
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
