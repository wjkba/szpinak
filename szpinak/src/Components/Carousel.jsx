import Slider from "react-slick";
import RecipeCard from "./RecipeCard";

export default function Carousel() {
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2.5,
    slidesToScroll: 1,
    swipe: true,
    swipeToSlide: true,
    touchMove: true,
  };
  return (
    <Slider className="-translate-x-2 max-w-[98vw]" {...settings}>
      <RecipeCard />
      <RecipeCard />
      <RecipeCard />
      <RecipeCard />
    </Slider>
  );
}
