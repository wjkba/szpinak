import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import RecipeCard from "./RecipeCard";
export default function RecipesPage() {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    fetchRecipes();
  }, []);
  async function fetchRecipes() {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/recipes");
      setRecipes(response.data);
    } catch (error) {
      console.error();
    }
  }
  return (
    <>
      <Navbar active="recipes" />
      <div className="grid place-items-center ">
        <div className="w-full lg:max-w-[1300px] max-w-[450px] px-4 py-[40px] lg:px-[120px] lg:py-[80px]">
          <h1 className="lg:text-4xl text-3xl mb-8 pl-4 sm:pl-2">recipes</h1>
          <div className="sm:grid sm:grid-cols-2  lg:grid-cols-4">
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
          </div>
        </div>
      </div>
    </>
  );
}
