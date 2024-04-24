import { useForm } from "react-hook-form";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      setError("root", { message: "error" });
    }
    console.log(data);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-2 place-items-center lg:min-w-[20rem]"
    >
      <div className="grid gap-2 mb-4 w-full">
        <input
          {...register("username", {
            required: "Username is required",
            minLength: {
              value: 3,
              message: "Username must have at least 3 characters",
            },
          })}
          className="bg-red p-1 w-full rounded border-2 border-[#214e9c]/14"
          placeholder="Username"
        />
        {errors.username && (
          <div className="text-sm text-red-400">{errors.username.message}</div>
        )}
        <input
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 3,
              message: "Password must have at least 3 characters",
            },
          })}
          className="bg-red p-1 w-full rounded border-2 border-[#214e9c]/14"
          type="password"
          placeholder="Password"
        />
        {errors.password && (
          <div className="text-sm text-red-400">{errors.password.message}</div>
        )}
      </div>

      <button
        disabled={isSubmitting}
        type="submit"
        className="rounded p-2 bg-[#3F3D56] text-white w-full"
      >
        {isSubmitting ? "Loading..." : "Login"}
      </button>
      {errors.root && (
        <div className="text-sm text-red-400">{errors.root.message}</div>
      )}
    </form>
  );
}
