import { GoStarFill } from "react-icons/go";
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
