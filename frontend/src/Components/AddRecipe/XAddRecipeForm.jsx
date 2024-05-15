import axios from "axios";
import { useFieldArray, useForm } from "react-hook-form";

export default function XAddRecipeForm() {
  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      ingredients: [[]],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  const onSubmit = async (data) => {
    axios
      .post("http://localhost:8000/api/recipe", {
        title: data.title,
        image: data.image,
        description: data.description,
        time: data.time,
        ingredients: data.ingredients,
        instructions: data.instructions,
      })
      .then((res) => console.log(res))
      .catch((error) => {
        console.error(error);
        setError("root", { message: error.message });
      });
    console.log(data);
  };

  return (
    <form className="lg:max-w-[20rem] w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col ">
        <div className="mb-2 ">
          <label>
            Title
            <input
              {...register("title", {
                required: "Title is required",
              })}
              type="text"
              className="border w-full"
            />
          </label>
          {errors.title && (
            <p className="text-sm text-red-400">{errors.title.message}</p>
          )}
        </div>
        <div className="mb-2">
          <label>
            Description
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              type="text"
              className="resize-none border min-h-[5rem] w-full"
            />
          </label>
          {errors.description && (
            <p className="text-sm text-red-400">{errors.description.message}</p>
          )}
        </div>
        <div className="mb-2">
          <label>
            Cooking time
            <input
              {...register("time", {
                required: "Time is required",
              })}
              type="text"
              className="border w-full"
            />
          </label>
          {errors.time && (
            <p className="text-sm text-red-400">{errors.time.message}</p>
          )}
        </div>
        <div className="mb-2">
          <label>
            Ingredients
            <ul>
              {fields.map((field, index) => (
                <li className="flex mb-2" key={field.id}>
                  <input
                    {...register(`ingredients.${index}.value`)}
                    type="text"
                    className="border w-full"
                  />

                  <button className="bg-red-500" onClick={() => appendInput()}>
                    append
                  </button>
                </li>
              ))}
            </ul>
          </label>
          {errors.ingredients && (
            <p className="text-sm text-red-400">{errors.ingredients.message}</p>
          )}
        </div>
        <div className="mb-2">
          <label>
            Instructions
            <input
              {...register("instructions", {
                required: "Instructions are required",
              })}
              type="text"
              className="border w-full"
            />
          </label>
          {errors.instructions && (
            <p className="text-sm text-red-400">
              {errors.instructions.message}
            </p>
          )}
        </div>
      </div>

      <div className="mb-2 ">
        <label>
          Image
          <input
            {...register("image", {
              required: "Image link is required",
            })}
            type="text"
            className="border w-full"
          />
        </label>
        {errors.image && (
          <p className="text-sm text-red-400">{errors.image.message}</p>
        )}
      </div>
      <button
        disabled={isSubmitting}
        type="submit"
        className="hover:bg-szpgreen rounded bg-szppurple text-white w-full border p-2 px-8 "
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
      {errors.root && (
        <p className="text-sm text-red-400">{errors.root.message}</p>
      )}
    </form>
  );

  function appendInput() {
    append({ ingredients: "ingredients" });
    console.log();
  }
}
