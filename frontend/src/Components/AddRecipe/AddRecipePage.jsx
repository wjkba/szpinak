import Navbar from "../Navbar";
import AddRecipeForm from "./AddRecipeForm";

export default function AddRecipePage() {
  return (
    <>
      <Navbar color="white" />
      <div className="grid place-items-center ">
        <div className="w-full  h-screen lg:max-w-[1300px] max-w-[600px] px-4 py-[40px] lg:px-[120px] lg:py-[80px]">
          <AddRecipeForm />
        </div>
      </div>
    </>
  );
}
