import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./Components/Home.jsx";
import Login from "./Components/Login&Register/Login.jsx";
import Register from "./Components/Login&Register/Register.jsx";
import Recipe from "./Components/Recipe.jsx";
import NotFound from "./Components/404.jsx";
import RecipesPage from "./Components/RecipesPage.jsx";
import AboutPage from "./Components/AboutPage.jsx";
import AddRecipeForm from "./Components/AddRecipe/AddRecipeForm.jsx";
import { AuthProvider } from "./Context/AuthContext.jsx";
import Account from "./Components/Account.jsx";
import SavedRecipesPage from "./Components/SavedRecipes/SavedRecipesPage.jsx";
import MyRecipesPage from "./Components/MyRecipes/MyRecipesPage.jsx";
import AddRecipePage from "./Components/AddRecipe/AddRecipePage.jsx";
import { RecipesContextProvider } from "./Context/RecipesContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/account",
    element: <Account />,
  },
  {
    path: "/saved",
    element: <SavedRecipesPage />,
  },
  {
    path: "/my-recipes",
    element: <MyRecipesPage />,
  },
  {
    path: "/add",
    element: <AddRecipePage />,
  },
  {
    path: "/recipe/:recipeId",
    element: <Recipe />,
  },
  {
    path: "/recipes",
    element: <RecipesPage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/addrecipe",
    element: <AddRecipeForm />,
  },
]);

function App() {
  return (
    <>
      <AuthProvider>
        <RecipesContextProvider>
          <RouterProvider router={router}></RouterProvider>
        </RecipesContextProvider>
      </AuthProvider>
    </>
  );
}

export default App;
