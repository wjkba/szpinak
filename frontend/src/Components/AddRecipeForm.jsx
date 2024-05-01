import Navbar from "./Navbar";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function AddRecipeForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

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

  // todo: add react hook form

  return (
    <>
      <Navbar />
      <div className="grid place-items-center ">
        <div className="w-full lg:max-w-[1300px] max-w-[450px] px-4 py-[40px] lg:px-[120px] lg:py-[80px]">
          <h1 className="lg:text-5xl text-4xl mb-4">add recipe</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col max-w-[20rem]">
              <div className="mb-2">
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
              <div className="mb-2">
                <label>
                  Description
                  <input
                    {...register("description", {
                      required: "Description is required",
                    })}
                    type="text"
                    className="border w-full"
                  />
                </label>
                {errors.description && (
                  <p className="text-sm text-red-400">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="mb-2">
                <label>
                  Time
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
                  <input
                    {...register("ingredients", {
                      required: "Ingredients are required",
                    })}
                    type="text"
                    className="border w-full"
                  />
                </label>
                {errors.ingredients && (
                  <p className="text-sm text-red-400">
                    {errors.ingredients.message}
                  </p>
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
            <button
              disabled={isSubmitting}
              type="submit"
              className="border px-8 bg-pink-400"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
            {errors.root && (
              <p className="text-sm text-red-400">{errors.root.message}</p>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
