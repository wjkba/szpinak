import { GoStarFill } from "react-icons/go";
import axios from "axios";

export async function checkToken() {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(
      `http://localhost:8000/verify-token/${token}`
    );
    console.log(response.data.message);
  } catch (error) {
    console.log("not verified");
  }
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
