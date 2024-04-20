import { Link } from "react-router-dom";

export default function RecipeCard({ title, image, rating, time }) {
  return (
    <div className="hover:scale-95 lg:text-lg  scale-90 transition-transform cursor-pointer shadow-md rounded-md">
      <Link to={"/recipe"}>
        <div>
          <img className="lg:max-h-[20rem] rounded-md" src={image} alt="" />
        </div>
        <div className="p-2 pt-2">
          <p className="font-bold mb-1">{title}</p>
          <div className="flex gap-[2px] mb-2">
            {displayRating(rating, "lg:min-w-[1rem]")}
          </div>
          <div className="flex items-center gap-2">
            <i className="fa-regular fa-clock fa-sm"></i>
            <p className="text-sm lg:text-base font-light">{time}</p>
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
          <img src="/images/sample-star.svg" className={classes} alt="" />
        </>
      );
    case 2:
      return (
        <>
          <img src="/images/sample-star.svg" className={classes} alt="" />
          <img src="/images/sample-star.svg" className={classes} alt="" />
        </>
      );
    case 3:
      return (
        <>
          <img src="/images/sample-star.svg" className={classes} alt="" />
          <img src="/images/sample-star.svg" className={classes} alt="" />
          <img src="/images/sample-star.svg" className={classes} alt="" />
        </>
      );
    case 4:
      return (
        <>
          <img src="/images/sample-star.svg" className={classes} alt="" />
          <img src="/images/sample-star.svg" className={classes} alt="" />
          <img src="/images/sample-star.svg" className={classes} alt="" />
          <img src="/images/sample-star.svg" className={classes} alt="" />
        </>
      );
    case 5:
      return (
        <>
          <img src="/images/sample-star.svg" className={classes} alt="" />
          <img src="/images/sample-star.svg" className={classes} alt="" />
          <img src="/images/sample-star.svg" className={classes} alt="" />
          <img src="/images/sample-star.svg" className={classes} alt="" />
          <img src="/images/sample-star.svg" className={classes} alt="" />
        </>
      );
    default:
      return <></>;
  }
}
