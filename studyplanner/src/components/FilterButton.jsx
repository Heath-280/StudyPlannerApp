function FilterButton({
  setFilter,
  filter
}) {

  return (

    <div className="flex gap-3 flex-wrap">

      <button

        onClick={() =>
          setFilter("all")
        }

        className={`px-5 py-3 rounded-2xl font-semibold transition-all duration-300 ${
          filter === "all"
            ? "bg-cyan-500 text-white"
            : "bg-slate-800 text-slate-300 hover:bg-slate-700"
        }`}

      >

        All

      </button>

      <button

        onClick={() =>
          setFilter("completed")
        }

        className={`px-5 py-3 rounded-2xl font-semibold transition-all duration-300 ${
          filter === "completed"
            ? "bg-green-500 text-white"
            : "bg-slate-800 text-slate-300 hover:bg-slate-700"
        }`}

      >

        Completed

      </button>

      <button

        onClick={() =>
          setFilter("pending")
        }

        className={`px-5 py-3 rounded-2xl font-semibold transition-all duration-300 ${
          filter === "pending"
            ? "bg-yellow-500 text-black"
            : "bg-slate-800 text-slate-300 hover:bg-slate-700"
        }`}

      >

        Pending

      </button>

    </div>

  );

}

export default FilterButton;