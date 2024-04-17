import Carousel from "./Carousel";
import MenuModal from "./MenuModal";
import Recipe from "./Recipe";
import { useState } from "react";

function Home() {
  return (
    <div className="max-w-[450px] p-2">
      <section id="introduction" className="mb-8">
        <div className="">
          <div className="grid place-items-center mb-4">
            <img src="/images/illustration.svg" alt="" />
          </div>
          <div>
            <h1 className="text-5xl font-bold mb-4">
              Szpinak dobry bardzo, <span className="text-szpgreen">mniam</span>
            </h1>
            <p className="text-lg leading-tight max-w-[25rem]">
              Szpinak ipsum dolor sit amet, consectetur adipiscing elit. Cursus
              imperdiet sed id elementum.
            </p>
          </div>
        </div>
      </section>
      <section id="newest" className="mb-12">
        <h2 className="text-2xl font mb-2">Our newest recipes:</h2>
        <Carousel />
      </section>
      <section id="popular" className="mb-12">
        <h2 className="text-2xl mb-2">Trending recipes:</h2>
        <Carousel />
      </section>
      <section id="recipes" className="">
        <h2 className="text-2xl mb-2">Recipes:</h2>
        <Carousel />
      </section>
    </div>
  );
}

export default Home;
