import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (data.password != data.confirm_password) {
      console.log("RRR");
      setError("confirm_password", { message: "Passwords don't match" });
      return 0;
    }
    try {
      const response = await axios.post(
        "http://localhost:8000/api/sign_up",
        data
      );
      console.log(response);
      navigate("/login");
    } catch (error) {
      setError("root", { message: error.response.data.detail });
    }
    console.log(data);
  };
  return (
    <div className="bg-white lg:max-w-none max-w-[450px] lg:flex gap-16 shadow-sm border-2 w-full lg:w-auto p-4 lg:p-12 ">
      <img
        className="mb-6 max-w-[12rem]"
        src="/images/register-undraw.svg"
        alt=""
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-2 place-items-center lg:min-w-[20rem]"
      >
        <p className="text-2xl w-full font-medium mb-2">Sign up now</p>

        <div className="grid gap-2 mb-1 w-full">
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
            <div className="text-sm text-red-400">
              {errors.username.message}
            </div>
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
            placeholder="Choose password"
          />
          {errors.password && (
            <div className="text-sm text-red-400">
              {errors.password.message}
            </div>
          )}
          <input
            {...register("confirm_password", {
              required: "confirm_Password is required",
              minLength: {
                value: 3,
                message: "Password must have at least 3 characters",
              },
            })}
            className="bg-red p-1 w-full rounded border-2 border-[#214e9c]/14"
            type="password"
            placeholder="Confirm password"
          />
          {errors.confirm_password && (
            <div className="text-sm text-red-400">
              {errors.confirm_password.message}
            </div>
          )}
        </div>

        <button
          disabled={isSubmitting}
          type="submit"
          className="rounded p-2 bg-[#3F3D56] text-white w-full"
        >
          {isSubmitting ? "Loading..." : "Register"}
        </button>
        {errors.root && (
          <div className="text-sm text-red-400">{errors.root.message}</div>
        )}
        <div className="mt-2 text-base w-full">
          <Link to="/login">
            Already have an account?{" "}
            <span className="text-blue-600">Log in</span>
          </Link>
        </div>
      </form>
    </div>
  );
}
