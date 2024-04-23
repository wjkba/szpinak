import { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";

export default function AddRecipeForm() {
  const [title, setTitle] = useState("title");
  const [image, setImage] = useState("image url");
  const [desc, setDesc] = useState("description");
  const [time, setTime] = useState("time");
  const [ingredients, setIngredients] = useState("ingredients");
  const [instructions, setInstructions] = useState("instructions");

  // todo: add react hook form
  const handleAddRecipe = () => {
    axios
      .post("http://localhost:8000/api/recipe", {
        title: title,
        image: image,
        description: desc,
        time: time,
        ingredients: ingredients,
        instructions: instructions,
      })
      .then((res) => console.log(res))
      .catch((error) => console.error(error));
  };

  return (
    <>
      <Navbar />
      <div className="grid place-items-center ">
        <div className="w-full lg:max-w-[1300px] max-w-[450px] px-4 py-[40px] lg:px-[120px] lg:py-[80px]">
          <h1 className="lg:text-5xl text-4xl mb-4">add recipe</h1>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col max-w-[20rem]">
              <input
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="title"
                className="border mb-2"
              />
              <input
                onChange={(e) => setImage(e.target.value)}
                type="text"
                placeholder="image"
                className="border mb-2"
              />
              <input
                onChange={(e) => setDesc(e.target.value)}
                type="text"
                placeholder="description"
                className="border mb-2"
              />

              <input
                onChange={(e) => setTime(e.target.value)}
                type="text"
                placeholder="time"
                className="border mb-2"
              />
              <input
                onChange={(e) => setIngredients(e.target.value)}
                type="text"
                placeholder="ingredients"
                className="border mb-2"
              />
              <input
                onChange={(e) => setInstructions(e.target.value)}
                type="text"
                placeholder="instructions"
                className="border mb-2"
              />
            </div>
            <button
              onClick={handleAddRecipe}
              className="border px-8 bg-szpgreen"
            >
              submit
            </button>
          </form>
        </div>
      </div>
      <code>
        <p>{title}</p>
        <p>{image}</p>
        <p>{desc}</p>
        <p>{time}</p>
        <p>{ingredients}</p>
        <p>{instructions}</p>
      </code>
    </>
  );
}
