import { Link } from "react-router-dom";
import { LuClock4 } from "react-icons/lu";
import { GoStarFill } from "react-icons/go";

export default function RecipeCard({ title, image, rating, time, id }) {
  return (
    <div className="hover:scale-95 lg:text-lg  scale-90 transition-transform cursor-pointer shadow-md rounded-md">
      <Link className="" to={`/recipe/${id}`}>
        <div className="row-span-3">
          <img className="lg:max-h-[20rem] rounded-md" src={image} alt="" />
        </div>
        <div className="flex flex-col justify-end p-2 pt-2">
          <p className="font-bold mb-1">{title}</p>
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

export function displayRating(number, classes = "") {
  switch (number) {
    case 1:
      return (
        <>
          <GoStarFill className={classes} />
        </>
      );
    case 2:
      return (
        <>
          <GoStarFill className={classes} />
          <GoStarFill className={classes} />
        </>
      );
    case 3:
      return (
        <>
          <GoStarFill className={classes} />
          <GoStarFill className={classes} />
          <GoStarFill className={classes} />
        </>
      );
    case 4:
      return (
        <>
          <GoStarFill className={classes} />
          <GoStarFill className={classes} />
          <GoStarFill className={classes} />
          <GoStarFill className={classes} />
        </>
      );
    case 5:
      return (
        <>
          {/* <img src="/images/sample-star.svg" className={classes} alt="" /> */}
          <GoStarFill className={classes} />
          <GoStarFill className={classes} />
          <GoStarFill className={classes} />
          <GoStarFill className={classes} />
          <GoStarFill className={classes} />
        </>
      );
    default:
      return <></>;
  }
}
