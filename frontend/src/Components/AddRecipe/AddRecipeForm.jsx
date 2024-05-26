/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from "react";
import { RiCloseLine } from "react-icons/ri";
import DragDropImage from "./DragDropImage";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddRecipeForm() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  const checkIfLoggedIn = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://127.0.0.1:8000/api/verify-token/${token}`
      );
      if (response.data.message === "verified") {
        setIsLoading(false);
      }
    } catch (error) {
      navigate("/");
    }
  };

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState([])
  const [ingredients, setIngredients] = useState([{ ingredient: "" }]);
  const [cookingTime, setCookingTime] = useState({
    time: "20",
    timeType: "minutes",
  });
  const [instructions, setInstructions] = useState("");
  const imageData = new FormData();

  const errorsDefault = {
    title: { error: false, message: "" },
    description: { error: false, message: "" },
    ingredients: { error: false, message: "" },
    cookingTime: { error: false, message: "" },
    instructions: { error: false, message: "" },
  };
  const [errors, setErrors] = useState(errorsDefault);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const inputRef = useRef();

  const handleValueChange = (index, event) => {
    const values = [...ingredients];
    values[index].ingredient = event.target.value;
    setIngredients(values);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }

    return () => {};
  }, [ingredients]);

  const handleAddInput = (index) => {
    const values = [...ingredients];
    if (values[index].ingredient !== "") {
      values.push({ ingredient: "" });
      setIngredients(values);
    }
  };
  const handleDeleteInput = (event, index) => {
    event.preventDefault();
    const values = [...ingredients];
    if (values.length > 1) {
      values.splice(index, 1);
      setIngredients(values);
    }
  };

  const handleSubmit = async() => {
    let newErrors = { ...errorsDefault };
    if (title.trim() === "") {
      console.log("Title is required");
      newErrors.title.error = true;
      newErrors.title.message = "Title is required";
    }
    if (description.trim() === "") {
      console.log("Description is required");
      newErrors.description.error = true;
      newErrors.description.message = "Description is required";
    }

    if (ingredients.some((ingredient) => ingredient.ingredient.trim() === "")) {
      console.log("All ingredients must have a value");
      newErrors.ingredients.error = true;
      newErrors.ingredients.message = "All ingredients must have a value";
    }
    if (cookingTime.time.trim() === "") {
      console.log("Cooking time is required");
      newErrors.cookingTime.error = true;
      newErrors.cookingTime.message = "Cooking time is required";
    }
    if (instructions.trim() === "") {
      console.log("Instructions are required");
      newErrors.instructions.error = true;
      newErrors.instructions.message = "Instructions are required";
    }
    setErrors(newErrors);
    if (
      !newErrors.title.error &&
      !newErrors.description.error &&
      !newErrors.cookingTime.error &&
      !newErrors.ingredients.error &&
      !newErrors.instructions.error
    ) {
      console.log(image)
      const imageUrl = await handleImageUpload()
      console.log(imageUrl) 
      await postRecipe(imageUrl)
    }
  };

    const handleImageUpload = async () => {
    imageData.append("file", image[0]);
    console.log(imageData);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/upload/recipe-image",
        imageData,
        {
          headers: {
            accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      const file_url = response.data.file_url;
      return file_url
    } catch (error) {
      console.log(error);
    }
  };

  const postRecipe = async (imageUrl) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://127.0.0.1:8000/api/recipe",
        {
          title: title,
          image: imageUrl,
          description: description,
          time: String(cookingTime.time + " " + cookingTime.timeType),
          ingredients: formatIngredients(),
          instructions: instructions,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response);
      setIsSubmitted(true);
    } catch (error) {
      console.log(error);
    }
  };

  const formatIngredients = () => {
    const formattedArray = [];
    console.log(ingredients);
    for (let i in ingredients) {
      formattedArray.push(ingredients[i].ingredient);
    }
    return formattedArray;
  };

  if (isLoading) {
    return <div>loading..</div>;
  }

  if (isSubmitted) {
    return (
      <div className="rounded shadow-md bg-white lg:p-8 max-w-[600px] p-4 w-full">
        <p>Recipe has been added!</p>
      </div>
    );
  }

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="rounded shadow-md  bg-white lg:p-8 max-w-[600px] p-4 w-full"
      >
        <div className="flex flex-col ">
          <h1 className="lg:text-4xl text-3xl mb-6 gri font-medium">
            Add recipe
          </h1>
          <div className="grid lg:flex mb-4 gap-2 ">
            <div className="flex  w-full lg:max-w-[250px] order-3 lg:order-none">
              <DragDropImage setImage={setImage} />
            </div>
            <div className="add-recipe-form">
              <div className="mb-2 ">
                <label>
                  <span className="font-medium">Title</span>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    className="mt-1 focus:border-szppurple/80 rounded outline-none  w-full p-1 min-h-[30px] border-2"
                  />
                </label>
                {errors.title.error && (
                  <div className="text-red-500 text-sm">
                    {errors.title.message}
                  </div>
                )}
              </div>
              <div>
                <label>
                  <span className="font-medium">Description</span>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    type="text"
                    className="mt-1 focus:border-szppurple/80 rounded resize-none outline-none min-h-[5rem] w-full p-1  border-2"
                  />
                </label>
                {errors.description.error && (
                  <div className="text-red-500 text-sm">
                    {errors.description.message}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="lg:flex gap-6">
            <div className="lg:order-2 mb-2">
              <label className="grid">
                <span className="font-medium">Cooking time</span>
                <div>
                  <input
                    value={cookingTime.time}
                    onChange={(e) =>
                      setCookingTime({ ...cookingTime, time: e.target.value })
                    }
                    placeholder="0"
                    maxLength={3}
                    className="mt-1 focus:border-szppurple/80 rounded-l outline-none max-w-[3rem] max-h-[30px] h-full  w-full p-1  border-2"
                  />
                  <select
                    className="h-[90%] bg-stone-100 rounded-r p-1"
                    onChange={(e) => {
                      setCookingTime({
                        ...cookingTime,
                        timeType: e.target.value,
                      });
                    }}
                  >
                    <option value="minutes">minutes</option>
                    <option value="hours">hours</option>
                  </select>
                </div>
              </label>
              {errors.cookingTime.error && (
                <div className="text-red-500 text-sm">
                  {errors.cookingTime.message}
                </div>
              )}
            </div>
            <div className="mb-4 lg:max-w-[250px] w-full ">
              <label>
                <span className="font-medium">Ingredients</span>
                <ul>
                  {ingredients.map((ingredient, index) => (
                    <li key={index}>
                      <div className="mt-1 mb-2 flex ">
                        <input
                          onKeyDown={(event) => {
                            if (event.key === "Enter") {
                              handleAddInput(index);
                            }
                          }}
                          type="text"
                          className=" focus:border-szppurple/80 rounded-l outline-none w-full p-0.5  border-2"
                          onChange={(e) => handleValueChange(index, e)}
                          value={ingredient.ingredient}
                          ref={
                            index === ingredients.length - 1 ? inputRef : null
                          }
                        />
                        <button
                          type="button"
                          onClick={(e) => handleDeleteInput(e, index)}
                          className="px-4 bg-stone-100 rounded-r"
                        >
                          <RiCloseLine />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleAddInput(0)}
                  type="button"
                  className="rounded bg-stone-100 w-full p-0.5"
                >
                  add ingredient
                </button>
              </label>
              {errors.ingredients.error && (
                <div className="text-red-500 text-sm">
                  {errors.ingredients.message}
                </div>
              )}
            </div>
          </div>
          <div className="mb-2">
            <label>
              <span className="font-medium">Instructions</span>
              <textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                type="text"
                className="mt-1 focus:border-szppurple/80 rounded resize-none outline-none min-h-[5rem] w-full p-1 border-2 "
              />
            </label>
            {errors.instructions.error && (
              <div className="text-red-500 text-sm">
                {errors.instructions.message}
              </div>
            )}
          </div>
        </div>

        <div className="mb-2 "></div>
        <button
          type="submit"
          className=" rounded min-h-[40px] bg-szppurple text-white w-full border p-2 px-8 "
          onClick={() => handleSubmit()}
        >
          Submit
        </button>
      </form>
    </>
  );
}
