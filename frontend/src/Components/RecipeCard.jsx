import { Link } from "react-router-dom";
import { LuClock4 } from "react-icons/lu";
import { displayRating } from "./utils";
import PropTypes from "prop-types";

export default function RecipeCard({ title, image, rating, time, id }) {
  return (
    <div className="hover:scale-95 lg:text-lg  scale-90 transition-transform cursor-pointer shadow-md rounded-md">
      <Link className="" to={`/recipe/${id}`}>
        <div className="row-span-3">
          <img className="lg:max-h-[20rem] rounded-md" src={image} alt="" />
        </div>
        <div className="flex flex-col justify-end p-2 pt-2">
          <p className="truncate font-bold mb-1">{title}</p>
          <div className="flex gap-[2px] mb-2">
            {displayRating(rating, "text-szpgreen text-base")}
          </div>
          <div className="flex items-center gap-2">
            <LuClock4 className="grid place-items-center" />
            <p className="text-sm  lg:text-base font-light">{time}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

RecipeCard.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  rating: PropTypes.number,
  time: PropTypes.string,
  id: PropTypes.number,
};
