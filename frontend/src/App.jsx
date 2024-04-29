import "./App.css";
import { useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  ScrollRestoration,
} from "react-router-dom";

import Home from "./Components/Home.jsx";
import Login from "./Components/Login&Register/Login.jsx";
import Register from "./Components/Login&Register/Register.jsx";
import Recipe from "./Components/Recipe.jsx";
import NotFound from "./Components/404.jsx";
import RecipesPage from "./Components/RecipesPage.jsx";
import AboutPage from "./Components/AboutPage.jsx";
import AddRecipeForm from "./Components/AddRecipeForm.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

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
        <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
    </>
  );
}

export default App;
