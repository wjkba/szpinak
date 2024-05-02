import RegisterForm from "./RegisterForm";
import Navbar from "../Navbar";

export default function Register() {
  return (
    <>
      <Navbar />

      <div className="grid place-items-center bg-szpgray mt-[6rem]">
        <div className=" rounded gird place-content-center  w-full bg-white p-4">
          <div className="grid place-items-center">
            <RegisterForm />
          </div>
        </div>
      </div>
    </>
  );
}
