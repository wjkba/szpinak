import Carousel from "./Carousel";
import MenuModal from "./MenuModal";
import Navbar from "./Navbar";
import { useState } from "react";
import data from "../data.json";

export default function Home() {
  let newest_recipes = [...data].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });
  const popular_recipes = [...data].sort((a, b) => b.views - a.views);
  const random_recipes = chooseRandomElements(data, 4);
  console.log("🚀 ~ Home ~ random_recipes:", random_recipes);

  return (
    <>
      <Navbar />
      <div className="grid place-items-center">
        <div className="max-w-[450px] lg:max-w-[1300px] w-full lg:px-[120px]">
          <section id="introduction" className="mt-8 mb-8">
            <div className="lg:flex flex-row-reverse items-center justify-between ">
              <div className="grid place-items-center mb-4">
                <img
                  className="lg:min-w-[20rem]"
                  src="/images/illustration.svg"
                  alt=""
                />
              </div>
              <div className="max-w-[25rem]">
                <h1 className="xs:text-4xl text-5xl font-bold mb-4">
                  Szpinak dobry bardzo,{" "}
                  <span className="text-szpgreen">mniam</span>
                </h1>
                <p className="xs:text-base text-lg leading-tight">
                  Szpinak ipsum dolor sit amet, consectetur adipiscing elit.
                  Cursus imperdiet sed id elementum.
                </p>
              </div>
            </div>
          </section>
          <section id="newest" className="mb-12">
            <h2 className="text-2xl font mb-2">Our newest recipes:</h2>
            <Carousel recipes={newest_recipes} />
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
    </>
  );
  function chooseRandomElements(list, numElements) {
    const shuffled = list.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, numElements);
  }
}
