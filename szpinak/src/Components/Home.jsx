import RecipeBar from "./RecipeBar";
function Home() {
  return (
    <>
      <section id="introduction" className="max-w-[450px] mb-8">
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
      <section id="newest">
        <div className="flex justify-center flex-wrap gap-2">
          <RecipeBar />
          <RecipeBar />
          <RecipeBar />
          <RecipeBar />
        </div>
      </section>
    </>
  );
}

export default Home;
