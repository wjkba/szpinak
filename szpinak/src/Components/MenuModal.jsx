export default function MenuModal({ handleToggleMenu, isMenu }) {
  return (
    <div className=" top-0 fixed w-screen h-screen bg-szpgray">
      <div className="mb-12">
        <div className="flex w-full justify-between items-center p-4 bg-szpgray">
          <div className="flex gap-2 items-center">
            <img src="/images/icon-spinach.png" alt="" />
            <p className="text-lg font-semibold">szpinak</p>
          </div>
          <div onClick={handleToggleMenu} className="cursor-pointer">
            <i className="fa-solid fa-x fa-lg"></i>
          </div>
        </div>
      </div>
      <div className="first-letter:">
        <div className="grid place-items-center gap-6 text-3xl">
          <p className="hover:font-medium cursor-pointer">recipes</p>
          <p className="hover:font-medium cursor-pointer">popular</p>
          <p className="hover:font-medium cursor-pointer">about</p>
          <p className="hover:font-medium cursor-pointer">login</p>
        </div>
      </div>
    </div>
  );
}
