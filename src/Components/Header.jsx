function Header() {
  return (
    <header className="border border-l-0 w-full px-4 py-6 flex justify-between">
      <div className="flex gap-2 border items-center w-fit px-2">
        <svg width="25" height="25" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M21.71 20.29L18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.39M11 18a7 7 0 1 1 7-7a7 7 0 0 1-7 7"
          />
        </svg>
        <input
          type="text"
          name=""
          id=""
          className="p-2 focus:outline-none"
          placeholder="Buscar"
        />
      </div>
      <select name="" id="" className="border p-2 w-52">
        <option value="">Piso 5</option>
        <option value="">Piso 7</option>
      </select>
    </header>
  );
}

export default Header;
