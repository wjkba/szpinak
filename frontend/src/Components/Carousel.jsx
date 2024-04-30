import Slider from "react-slick";
import RecipeCard from "./RecipeCard";

export default function Carousel({ recipes = [] }) {
  var settings_x = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4.5,
    slidesToScroll: 1,
    swipe: true,
    swipeToSlide: true,
    touchMove: true,
    dragable: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          dots: false,
          infinite: false,
          speed: 500,
          slidesToShow: 2.5,
          slidesToScroll: 1,
          swipe: true,
          swipeToSlide: true,
          touchMove: true,
          dragable: false,
        },
      },
    ],
  };

  if (recipes != []) {
    return (
      <Slider
        className="lg:-translate-x-3 -translate-x-2 lg:max-w-[80vw]  max-w-[98vw]"
        {...settings_x}
      >
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            id={recipe.id}
            title={recipe.title}
            image={recipe.image}
            rating={recipe.rating}
            time={recipe.time}
          />
        ))}
      </Slider>
    );
  }

  // return (
  //   <Slider className="-translate-x-2 max-w-[98vw]" {...settings}>
  //     <RecipeCard />
  //     <RecipeCard />
  //     <RecipeCard />
  //     <RecipeCard />
  //   </Slider>
  // );
}
