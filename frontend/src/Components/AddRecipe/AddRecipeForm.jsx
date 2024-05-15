import { useEffect, useState, useRef } from "react";
import { RiCloseLine } from "react-icons/ri";

export default function AddRecipeForm() {
  const [ingredients, setIngredients] = useState([{ ingredient: "" }]);
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
      <button onClick={() => console.log(ingredients)}>xxx</button>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="lg:max-w-[20rem] w-full"
      >
        <div className="flex flex-col ">
          <div className="mb-2 ">
            <label>
              Title
              <input type="text" className="border w-full" />
            </label>
          </div>
          <div className="mb-2">
            <label>
              Description
              <textarea
                type="text"
                className="resize-none border min-h-[5rem] w-full"
              />
            </label>
          </div>
          <div className="mb-2">
            <label>
              Cooking time
              <input type="text" className="border w-full" />
            </label>
          </div>
          <div className="mb-2">
            <label>
              Ingredients
              <ul>
                {ingredients.map((ingredient, index) => (
                  <li key={index} className="flex mb-2">
                    <input
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          handleAddInput(index);
                        }
                      }}
                      type="text"
                      className="outline-none border w-full"
                      onChange={(e) => handleValueChange(index, e)}
                      value={ingredient.ingredient}
                      ref={index === ingredients.length - 1 ? inputRef : null}
                    />
                    <button
                      type="button"
                      onClick={(e) => handleDeleteInput(e, index)}
                      className="px-4 bg-szpgray"
                    >
                      <RiCloseLine />
                    </button>
                  </li>
                ))}
              </ul>
            </label>
          </div>
          <div className="mb-2">
            <label>
              Instructions
              <input type="text" className="border w-full" />
            </label>
          </div>
        </div>

        <div className="mb-2 ">
          <label>
            Image
            <input type="text" className="border w-full" />
          </label>
        </div>
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
