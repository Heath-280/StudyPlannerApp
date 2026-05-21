function SearchBar({
  searchTerm,
  setSearchTerm
}) {

  return (

    <div className="w-full md:w-1/2">

      <input

        type="text"

        placeholder="Search Subject..."

        value={searchTerm}

        onChange={(e) =>
          setSearchTerm(
            e.target.value
          )
        }

        className="w-full p-4 rounded-2xl bg-slate-800 border border-slate-700 text-white outline-none focus:ring-2 focus:ring-cyan-500 shadow-lg"

      />

    </div>

  );

}

export default SearchBar;