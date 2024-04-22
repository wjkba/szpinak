import { Link } from "react-router-dom";
import Navbar from "./Navbar";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <div className="grid place-items-center bg-szpgray">
        <div className="h-[50vh] rounded grid place-items-center  w-full bg-white p-4">
          <div className="max-w-[20rem] w-full ">
            <h1 className="text-3xl mb-8">404 not found</h1>
            <Link
              to={"/"}
              className="p-2 pl-4 pr-4 grid place-items-center rounded text-white bg-szpgreen   w-full"
            >
              <p>go home</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
