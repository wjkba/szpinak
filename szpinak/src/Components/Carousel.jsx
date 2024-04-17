import Slider from "react-slick";
import Recipe from "./Recipe";
export default function Carousel() {
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2.5,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      <div>
        <Recipe />
      </div>
      <div>
        <Recipe />
      </div>
      <div>
        <Recipe />
      </div>
      <div>
        <Recipe />
      </div>
    </Slider>
  );
}
