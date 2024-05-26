import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import axios from "axios";
import RecipeCard from "../RecipeCard";

export default function SavedRecipesPage() {
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    fetchSavedRecipes();
  }, []);

  const fetchSavedRecipes = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:8000/api/saved-recipes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSavedRecipes(response.data);
      console.log(response.data)
    } catch (error) {
      console.log("please log in")
    }
  };
  return (
    <>
      <Navbar />
      <div className="grid place-items-center ">
        <div className="w-full lg:max-w-[1300px] max-w-[450px] px-4 py-[40px] lg:px-[120px] lg:py-[80px]">
          <h1 className="text-3xl lg:text-4xl mb-4">Saved recipes</h1>
          {savedRecipes.length == 0 ? <div className="mt-8 lg:text-center text-xl lg:text-2xl">{`You don't have any saved recipes.`}</div>: ""}
          <div className="-translate-x-2 sm:grid sm:grid-cols-2  lg:grid-cols-4">
            {savedRecipes.map((recipe) => (
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
