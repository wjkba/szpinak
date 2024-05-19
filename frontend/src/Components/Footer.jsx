import { Link } from "react-router-dom";

export default function Footer() {
  const date = new Date().getFullYear();
  return (
    <footer className=" mt-[6rem] w-full lg:max-w-[1300px]  max-w-[450px] px-4 py-[40px] lg:px-[120px] border-8 border-pink-200  bg-yellow-200">
      <p className="mb-4">&copy; szpinak {date}</p>
      <ul className="grid place-items-center gap-2">
        <li>
          <Link to="/recipes">recipes</Link>
        </li>
        <li>
          <Link to="/about">about</Link>
        </li>
        <li>
          <Link to="/login">login</Link>
        </li>
        <li>
          <Link to="/register">register</Link>
        </li>
        <li>
          <Link to="/saved">saved recipes</Link>
        </li>
        <li>
          <Link to="/my-recipes">my recipes</Link>
        </li>
        <li>
          <Link to="/add">add recipe</Link>
        </li>
      </ul>
    </footer>
  );
}
