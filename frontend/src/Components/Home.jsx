import Carousel from "./Carousel";
import Navbar from "./Navbar";
import { useMemo } from "react";
import { ScrollRestoration } from "react-router-dom";
import { useRecipesContext } from "../Context/RecipesContext";

export default function Home() {
  const { recipes, loading, error } = useRecipesContext();

  const newestRecipes = useMemo(
    () => [...recipes].sort((a, b) => new Date(b.date) - new Date(a.date)),
    [recipes]
  );
  const popularRecipes = useMemo(
    () => [...recipes].sort((a, b) => b.views - a.views),
    [recipes]
  );
  const randomRecipes = useMemo(
    () => chooseRandomElements(recipes, 5),
    [recipes]
  );

  const RenderCarousel = (recipe_array) => {
    if (loading) {
      return <p>Loading...</p>;
    }
    if (error) {
      return <p>{error}</p>;
    }
    return <Carousel recipes={recipe_array} />;
  };

  return (
    <div className="bg-offwhite">
      <Navbar />
      <div className="grid place-items-center">
        <div className="max-w-[450px] lg:max-w-[1300px] w-full lg:px-[120px]">
          <section id="introduction" className="mt-8 lg:my-[80px] mb-8">
            <div className="lg:flex flex-row-reverse items-center justify-between ">
              <div className="grid place-items-center mb-4">
                <img
                  className="lg:min-w-[25rem]"
                  src="/images/illustration.svg"
                  alt=""
                />
              </div>
              <div className="lg:max-w-[28rem] max-w-[24rem]">
                <h1 className="lg:text-6xl xs:text-4xl text-5xl font-semibold mb-4 ">
                  Szpinak dobry bardzo,{" "}
                  <span className="text-szpgreen">mniam</span>
                </h1>
                <p className="xs:text-base lg:text-lg leading-tight ">
                  Szpinak ipsum dolor sit amet, consectetur adipiscing elit.
                  Cursus imperdiet sed id elementum.
                </p>
              </div>
            </div>
          </section>
          <section id="newest" className="mb-12">
            <h2 className="text-2xl mb-2">Newest recipes:</h2>
            {RenderCarousel(newestRecipes)}
          </section>
          <section id="popular" className="mb-12">
            <h2 className="text-2xl mb-2">Trending recipes:</h2>
            {RenderCarousel(popularRecipes)}
          </section>
          <section id="recipes" className="">
            <h2 className="text-2xl mb-2">Recipes:</h2>
            {RenderCarousel(randomRecipes)}
          </section>
        </div>
      </div>
      <ScrollRestoration />
    </div>
  );
}

function chooseRandomElements(list, numElements) {
  const shuffled = list.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, numElements);
}
