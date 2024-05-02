import axios from "axios";
import { useForm } from "react-hook-form";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function LoginForm() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const form_data = new FormData();
    form_data.append("username", data.username);
    form_data.append("password", data.password);
    try {
      const response = await axios.post(
        "http://localhost:8000/token",
        form_data
      );
      console.log(response);
      console.log(response.data.access_token);
      localStorage.setItem("token", response.data.access_token);
      setIsLoggedIn(true);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      setError("root", { message: error.response.data.detail });
    }
    console.log(data);
  };
  return (
    <>
      {isLoggedIn ? (
        <>
          <p className="mb-4">logged in</p>
        </>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-2 place-items-center lg:min-w-[20rem]"
        >
          {isLoggedIn ? (
            <>
              <p className="bg-yellow-200 w-full text-center">logged in</p>
            </>
          ) : (
            <p className="bg-yellow-200 w-full text-center">not logged in</p>
          )}
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
              placeholder="Password"
            />
            {errors.password && (
              <div className="text-sm text-red-400">
                {errors.password.message}
              </div>
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
          <div className="mt-2 text-base">
            <Link to="/register">
              Not a member? <span className="text-blue-600">Sign up</span>
            </Link>
          </div>
        </form>
      )}
    </>
  );
}
