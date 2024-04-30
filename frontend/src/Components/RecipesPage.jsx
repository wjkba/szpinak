import Carousel from "./Carousel";
import Navbar from "./Navbar";
export default function RecipesPage() {
  return (
    <>
      <Navbar />
      <div className="grid place-items-center ">
        <div className="w-full lg:max-w-[1300px] max-w-[450px] px-4 py-[40px] lg:px-[120px] lg:py-[80px]">
          <h1 className="lg:text-5xl text-4xl mb-4">recipes:</h1>
        </div>
      </div>
    </>
  );
}
