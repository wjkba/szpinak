import { useEffect, useState, useRef } from "react";
import { RiCloseLine } from "react-icons/ri";
import DragDropImage from "./DragDropImage";

export default function AddRecipeForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([{ ingredient: "" }]);
  const [cookingTime, setCookingTime] = useState("");
  const [instructions, setInstructions] = useState("");
  const inputRef = useRef();

  const handleValueChange = (index, event) => {
    const values = [...ingredients];
    values[index].ingredient = event.target.value;
    setIngredients(values);
  };

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

  useEffect(() => {
    inputRef.current.focus();
  }, [ingredients]);

  return (
    <>
      <button
        onClick={() => {
          console.log(
            title,
            description,
            ingredients,
            cookingTime,
            instructions
          );
        }}
        className="bg-yellow-200 rounded"
      >
        check values
      </button>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="rounded bg-white lg:p-8 lg:max-w-[600px] w-full"
      >
        <div className="flex flex-col ">
          <div className="grid lg:flex mb-4 gap-2 ">
            <div className="flex  w-full lg:max-w-[18rem] order-3 lg:order-none">
              <DragDropImage />
            </div>
            <div>
              <div className="mb-2 ">
                <label>
                  Title
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    className="mt-1 focus:border-szppurple/80 rounded outline-none border w-full"
                  />
                </label>
              </div>
              <div>
                <label>
                  Description
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    type="text"
                    className="mt-1 focus:border-szppurple/80 rounded resize-none border min-h-[5rem] w-full"
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="lg:flex gap-6">
            <div className="lg:order-2 mb-2">
              <label className="grid">
                Cooking time
                <div>
                  <input
                    value={cookingTime}
                    onChange={(e) => setCookingTime(e.target.value)}
                    placeholder="0"
                    maxLength={3}
                    className="mt-1 focus:border-szppurple/80 rounded outline-none max-w-[3rem] border w-full"
                  />
                  <select className="h-full">
                    <option value="minutes">minutes</option>
                    <option value="hours">hours</option>
                  </select>
                </div>
              </label>
            </div>
            <div className="mb-4 lg:max-w-[18rem] w-full ">
              <label>
                Ingredients
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
                          className=" focus:border-szppurple/80 rounded-l outline-none border w-full"
                          onChange={(e) => handleValueChange(index, e)}
                          value={ingredient.ingredient}
                          ref={
                            index === ingredients.length - 1 ? inputRef : null
                          }
                        />
                        <button
                          type="button"
                          onClick={(e) => handleDeleteInput(e, index)}
                          className="px-4 bg-szpgray rounded-r"
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
                  className="rounded bg-szpgray w-full"
                >
                  add ingredient
                </button>
              </label>
            </div>
          </div>
          <div className="mb-2">
            <label>
              Instructions
              <textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                type="text"
                className="mt-1 focus:border-szppurple/80 rounded resize-none border min-h-[5rem] w-full"
              />
            </label>
          </div>
        </div>

        <div className="mb-2 "></div>
        <button
          type="submit"
          className="hover:bg-szpgreen rounded bg-szppurple text-white w-full border p-2 px-8 "
        >
          Submit
        </button>
      </form>
    </>
  );
}
