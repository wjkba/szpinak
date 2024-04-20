import "./App.css";
import { useState } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import Home from "./Components/Home.jsx";
import Login from "./Components/Login.jsx";
import Recipe from "./Components/Recipe.jsx";
import NotFound from "./Components/404.jsx";
import RecipesPage from "./Components/RecipesPage.jsx";
import AboutPage from "./Components/AboutPage.jsx";

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
    path: "/recipe",
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
]);

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
