function Navbar() {
  return (
    <div className="">
      <div className="flex w-full justify-between items-center p-4 bg-szpgray">
        <div className="flex gap-2 items-center">
          <img src="/images/icon-spinach.png" alt="" />
          <p className="text-lg font-semibold">szpinak</p>
        </div>
        <div>
          <i className="fa-solid fa-bars fa-lg"></i>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
