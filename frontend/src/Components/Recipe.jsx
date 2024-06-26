/* eslint-disable react-hooks/exhaustive-deps */
import Navbar from "./Navbar";
import { useNavigate, useParams, ScrollRestoration } from "react-router-dom";
import { displayRating } from "./utils";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
import { FaPrint } from "react-icons/fa";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";

export default function Recipe() {
  const {isLoggedIn} = useAuth()
  const [isSaved, setIsSaved] = useState(false);
  const [recipe, setRecipe] = useState([]);
  const [ingredients, setIngredients] = useState([])
  const navigate = useNavigate();
  const params = useParams();
  const recipeId = Number(params.recipeId);
  // const recipe = data.find((element) => element.id === recipeId);

  useEffect(() => {
    fetchRecipe();
    if(isLoggedIn)fetchSavedRecipes() 
  }, []);

  const fetchRecipe = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/recipe/${recipeId}`
      );
      setRecipe(...response.data);
      setIngredients(response.data[0].ingredients)
    } catch (error) {
      console.log(error);
    }
  };


  const fetchSavedRecipes = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:8000/api/saved-recipes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const saved_recipes = response.data;
      let isRecipeSaved = saved_recipes.some(
        (recipe) => recipe.id === parseInt(recipeId)
      );
      if (isRecipeSaved) {
        setIsSaved(true);
      }
    } catch (error) {
      return
    }
  };

  const handleSaveRecipe = async () => {
    if (isSaved) {
      navigate("/saved");
    } else {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          `http://localhost:8000/api/save_recipe/${recipeId}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setIsSaved(true);
        console.log(response);
      } catch (error) {
        navigate("/login");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="grid place-items-center">
        <div className="max-w-[450px] lg:max-w-[1300px] lg:px-[120px] w-full p-2">
          <section id="recipe__info" className="mt-[20px] mb-8">
            <div className="p-4 px-8 mb-[20px] pl-0">
              <button
                className="bg-szpgray min-w-[7rem] grid place-items-center p-2 rounded cursor-pointer"
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
                  <div className="flex items-center gap-2 mb-4">
                    <p>Author: {recipe.author}</p>
                  </div>
                  <p className="mb-4 lg:text-lg lg:max-w-[30rem] lg:mb-6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Pellentesque at imperdiet ipsum. Integer ac rutrum ante, ac
                    feugiat leo. Vestibulum eget malesuada metus. Vestibulum
                    felis justo, iaculis ac risus vitae
                  </p>
                </div>
                <div className="flex gap-5 ">
                  <button
                    onClick={() => handleSaveRecipe()}
                    className={`p-2 pl-4 pr-4 rounded bg-szpgreen hover:bg-[#404040] text-white flex items-center gap-2`}
                  >
                    <FaBookmark />
                    <p>{!isSaved ? "save recipe" : "saved"}</p>
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
                {ingredients.map((ingredient, i)=> (<li key={i}>{ingredient}</li>))}
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
