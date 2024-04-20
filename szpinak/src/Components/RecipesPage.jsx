import Navbar from "./Navbar";
export default function RecipesPage() {
  return (
    <>
      <Navbar />
      <div className="grid place-items-center ">
        <div className="w-full lg:max-w-[1300px] max-w-[450px] px-4 py-[40px] lg:px-[120px] lg:py-[80px]">
          <h1 className="lg:text-5xl text-4xl mb-4">recipes:</h1>
          <p className="lg:text-lg lg:max-w-[600px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
            vehicula, massa in porta vehicula, odio justo ornare nibh, vel
            laoreet ex turpis sed magna. Duis pulvinar massa odio, eu faucibus
            enim commodo sed. Nam molestie lorem nec ipsum accumsan, nec viverra
            orci sagittis. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Aliquam ac orci id dui aliquam interdum. Duis sed rhoncus
            mauris. Aliquam sit amet ante in purus tincidunt egestas id et nunc.
            Curabitur pharetra semper lectus, consectetur viverra nibh. Sed
            mattis turpis at imperdiet malesuada. Pellentesque cursus facilisis
            tempor. Nam dictum est vel egestas luctus. Aenean ac tellus quis
            lacus semper commodo. Morbi posuere scelerisque feugiat. Duis
          </p>
        </div>
      </div>
    </>
  );
}
