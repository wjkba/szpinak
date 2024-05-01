import Navbar from "./Navbar";
import { useNavigate, useParams, ScrollRestoration } from "react-router-dom";
import { displayRating } from "./utils";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
import { FaPrint } from "react-icons/fa";
import data from "../data.json";

export default function Recipe() {
  const navigate = useNavigate();
  const params = useParams();
  const recipeId = Number(params.recipeId);
  const recipe = data.find((element) => element.id === recipeId);

  return (
    <>
      <Navbar />
      <div className="grid place-items-center">
        <div className="max-w-[450px] lg:max-w-[1300px] lg:px-[120px] w-full p-2">
          <section id="recipe__info" className="lg:mt-[20px] mt-8 mb-8">
            <div className="p-4 pl-0">
              <button
                className="bg-szpgray min-w-[5rem] grid place-items-center p-2 rounded cursor-pointer"
                onClick={() => navigate(-1)}
              >
                <FaArrowLeftLong size={20} />
              </button>
            </div>
            <div className="lg:grid grid-cols-2 lg:gap-10">
              <div className=" grid place-items-center mb-4 ">
                <img className="rounded-lg  w-full" src={recipe.image} alt="" />
              </div>
              <div className="">
                <div>
                  <div>
                    <h2 className="lg:text-5xl lg:mb-4 text-3xl font-semibold mb-2">
                      {recipe.title}
                    </h2>
                    <div className="flex  gap-[2px] lg:mb-4 mb-2">
                      {displayRating(recipe.rating, "text-szpgreen lg:text-xl")}
                    </div>
                  </div>
                  <p className="mb-4 lg:text-lg lg:max-w-[30rem] lg:mb-6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Pellentesque at imperdiet ipsum. Integer ac rutrum ante, ac
                    feugiat leo. Vestibulum eget malesuada metus. Vestibulum
                    felis justo, iaculis ac risus vitae
                  </p>
                </div>
                <div className="flex gap-5 ">
                  <button className="p-2 pl-4 pr-4 rounded bg-szpgreen hover:bg-[#404040] text-white flex items-center gap-2">
                    <FaBookmark />
                    <p>save recipe</p>
                  </button>
                  <button className="text-[#404040] hover:text-black flex gap-2 items-center">
                    <FaShare />
                    <p>share</p>
                  </button>
                  <button className="text-[#404040] hover:text-black flex gap-2 items-center">
                    <FaPrint />
                    <p>print</p>
                  </button>
                </div>
              </div>
            </div>
          </section>
          <section id="recipe__ingredients" className="mb-8 lg:mb-12">
            <div className="bg-[#3F3D56] text-white p-4">
              <h2 className="font-semibold text-lg lg:text-3xl mb-2 lg:mb-4">
                Ingredients
              </h2>
              <ul className="list-disc pl-4 lg:text-lg">
                <li>8 oz (225g) pasta (such as penne or fusilli)</li>
                <li>2 tablespoons olive oil</li>
                <li>3 cloves garlic, minced</li>
                <li>1 small onion, finely chopped</li>
                <li>8 oz (225g) mushrooms, sliced</li>
                <li>4 cups fresh spinach, washed and chopped</li>
                <li>1 cup heavy cream</li>
                <li>1/2 cup grated Parmesan cheese</li>
                <li>Salt and pepper to taste</li>
                <li>Red pepper flakes (optional, for added heat)</li>
                <li>Fresh parsley, chopped (for garnish)</li>
              </ul>
            </div>
          </section>
          <section id="recipe__instructions" className="mb-12">
            <h2 className=" font-bold lg:text-3xl text-lg mb-2 lg:mb-4">
              Instructions
            </h2>
            <ol className=" list-decimal pl-4 lg:max-w-[600px] lg:text-lg">
              <li className="font-semibold">Cook the Pasta</li>
              <p>
                Bring a large pot of salted water to a boil. Add the pasta and
                cook according to the package instructions until al dente. Drain
                and set aside.
              </p>
              <li className="font-semibold">Prepare the Spinach:</li>
              <p>
                While the pasta is cooking, heat 1 tablespoon of olive oil in a
                large skillet over medium heat. Add minced garlic and sauté for
                1-2 minutes until fragrant. Add chopped onion to the skillet and
                cook until translucent, about 2-3 minutes. Stir in sliced
                mushrooms and cook for another 5-6 minutes until they release
                their moisture and start to brown.
              </p>
              <li className="font-semibold">Add Spinach and Cream:</li>
              <p>
                Add chopped spinach to the skillet and cook until wilted, about
                2-3 minutes. Pour in the heavy cream and stir to combine. Allow
                the mixture to simmer gently for 2-3 minutes to thicken
                slightly.
              </p>
              <li className="font-semibold">Combine Pasta and Sauce</li>
              <p>
                Add the cooked pasta to the skillet with the spinach and
                mushroom sauce. Sprinkle grated Parmesan cheese over the pasta
                and sauce mixture. Stir well to combine, ensuring the pasta is
                evenly coated with the sauce. Season with salt, pepper, and red
                pepper flakes if desired, adjusting to taste.
              </p>
              <li className="font-semibold">Serve:</li>
              <p>
                Once the pasta is heated through and the sauce has thickened to
                your liking, remove the skillet from the heat. Garnish with
                chopped fresh parsley for a burst of color and freshness. Serve
                immediately, portioning into bowls or onto plates.
              </p>
            </ol>
          </section>
          <section id="trending" className="mb-12">
            {/* <h2 className="text-2xl mb-2">Trending recipes:</h2>
            <Carousel /> */}
          </section>
        </div>
      </div>
      <ScrollRestoration />
    </>
  );
}
