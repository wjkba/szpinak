function RecipeBar() {
  return (
    <div className="shadow-md rounded-md">
      <div>
        <div>
          <img src="/images/sample-szpinak.png" alt="" />
        </div>
        <div className="p-2 pt-2">
          <p className="font-bold mb-1">Szpinak dobry</p>
          <div className="flex gap-[2px] mb-2">
            <img src="/images/sample-star.svg" alt="" />
            <img src="/images/sample-star.svg" alt="" />
            <img src="/images/sample-star.svg" alt="" />
            <img src="/images/sample-star.svg" alt="" />
            <img src="/images/sample-star.svg" alt="" />
          </div>
          <div className="flex items-center gap-1">
            <i className="fa-regular fa-clock fa-sm"></i>
            <p className="text-sm font-light">2 hours</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeBar;
