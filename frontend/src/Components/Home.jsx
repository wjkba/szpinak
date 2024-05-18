import Carousel from "./Carousel";

import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { ScrollRestoration } from "react-router-dom";

export default function Home() {
  // TODO: recipes powinny byc pobierane raz przy wejscu do aplikacji
  // TODO: zmniejsz ilosc requestow

  const apiUrl = "http://localhost:8000/api";

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRecipes();
  }, []);

  let newest_recipes = [...recipes].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });
  const popular_recipes = [...recipes].sort((a, b) => b.views - a.views);
  const random_recipes = chooseRandomElements(recipes, 5);

  // fetch recipes from szpinak_db
  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const recipesResponse = await axios.get(`${apiUrl}/recipes`);
      console.log(recipesResponse);
      setRecipes(recipesResponse.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
    console.log();
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
            <h2 className="text-2xl font mb-2">Newest recipes:</h2>
            {loading ? (
              <div>Loading</div>
            ) : (
              <Carousel recipes={newest_recipes} />
            )}
          </section>
          <section id="popular" className="mb-12">
            <h2 className="text-2xl mb-2">Trending recipes:</h2>
            <Carousel recipes={popular_recipes} />
          </section>
          <section id="recipes" className="">
            <h2 className="text-2xl mb-2">Recipes:</h2>
            <Carousel recipes={random_recipes} />
          </section>
        </div>
      </div>
      <ScrollRestoration />
    </div>
  );
  function chooseRandomElements(list, numElements) {
    const shuffled = list.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, numElements);
  }
}
