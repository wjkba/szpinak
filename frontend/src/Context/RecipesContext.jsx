import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { useContext } from "react";
import PropTypes from "prop-types";

const apiUrl = "http://localhost:8000/api";
const RecipesContext = createContext(null);

export function RecipesContextProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const value = { recipes, loading, error };

  useEffect(() => {
    // fetch recipes from szpinak_db
    const initFetch = async () => {
      setLoading(true);
      console.log("FETCHING");
      try {
        const recipesResponse = await axios.get(`${apiUrl}/recipes`);
        localStorage.setItem("recipes", JSON.stringify(recipesResponse.data));
        localStorage.setItem("recipesTimestamp", Date.now());
        setRecipes(recipesResponse.data);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch recipes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    const cachedRecipes = localStorage.getItem("recipes");
    const cachedTimestamp = localStorage.getItem("recipesTimestamp");
    const cacheAge = Date.now() - (cachedTimestamp || 0);
    const maxCacheAge = 30 * 60 * 1000; // 30 minutes

    if (cacheAge < maxCacheAge) {
      setRecipes(JSON.parse(cachedRecipes));
      setLoading(false);
    } else {
      initFetch();
    }
  }, []);

  return (
    <RecipesContext.Provider value={value}>{children}</RecipesContext.Provider>
  );
}

export function useRecipesContext() {
  return useContext(RecipesContext);
}

RecipesContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
