import { useState, useEffect } from "react";
import Navbar from "../Navbar";
import axios from "axios";
import RecipeCard from "../RecipeCard";

export default function MyRecipesPage() {
  const [myRecipes, setMyRecipes] = useState([]);
  useEffect(() => {
    fetchMyRecipes();
  }, []);

  const fetchMyRecipes = async () => {
    try {
      const username = localStorage.getItem("username");
      const response = await axios.get(
        `http://127.0.0.1:8000/api/recipes/${username}`
      );
      setMyRecipes(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="grid place-items-center ">
        <div className="w-full lg:max-w-[1300px] max-w-[450px] px-4 py-[40px] lg:px-[120px] lg:py-[80px]">
          <h1 className="lg:text-5xl text-4xl mb-4">My recipes</h1>
          <div className="sm:grid sm:grid-cols-2  lg:grid-cols-4">
            {myRecipes.map((recipe) => (
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
