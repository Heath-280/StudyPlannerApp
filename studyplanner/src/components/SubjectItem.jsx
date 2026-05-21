function SubjectItem({

  t,

  editedSubject,

  editIndex,

  seteditedSubject,

  saveEdit,

  startEdit,

  removeSubject,

  MarkAsDone,

  deleteLoading,

}) {

  const isOverdue = !t.completed && new Date(t.dueDate) < new Date();

  return (

    <li
      className={`flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-900 border border-slate-700 rounded-2xl p-6 mb-4 shadow-xl transition-all duration-300 hover:border-cyan-500/40 hover:shadow-cyan-500/10 ${
        t.completed
          ? "opacity-60"
          : ""
      }`}
    >

      {/* LEFT SIDE */}

      <div className="flex-1">

        {

          t._id === editIndex ? (

            <div className="flex gap-3">

              <input
                type="text"
                value={editedSubject}
                onChange={(e) =>
                  seteditedSubject(
                    e.target.value
                  )
                }
                className="flex-1 p-3 rounded-xl bg-slate-800 border border-slate-600 text-white outline-none focus:ring-2 focus:ring-cyan-500"
              />

              <button
                onClick={() =>
                  saveEdit(t._id)
                }
                className="px-5 py-3 rounded-xl bg-green-600 hover:bg-green-700 transition-all duration-300 font-semibold"
              >

                Save

              </button>

            </div>

          ) : (

            <div>

              {/* TITLE */}

              <h2
                className={`text-2xl font-bold ${
                  t.completed
                    ? "line-through text-gray-400"
                    : "text-white"
                }`}
              >

                {t.title}

              </h2>

              {/* DETAILS */}

              <div className="mt-4 space-y-2">

                <p className="text-slate-400">

                  📅 Due Date:
                  {" "}
                  <span className="text-slate-200">

                    {
                      new Date(
                        t.dueDate
                      ).toLocaleDateString()
                    }

                  </span>

                </p>

                <p className="text-slate-400">

                  ⏱ Duration:
                  {" "}
                  <span className="text-slate-200">

                    {t.duration} hrs

                  </span>

                </p>

              </div>

              {/* PRIORITY BADGE */}

              <div className="mt-4">

                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold shadow-md ${
                    t.priority === "High"
                      ? "bg-red-500/20 text-red-400 border border-red-500/30"
                      : t.priority === "Medium"
                      ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                      : "bg-green-500/20 text-green-400 border border-green-500/30"
                  }`}
                >

                  {t.priority} Priority

                  {
                    isOverdue && (

                      <div className="mt-4">
                        <span className="px-4 py-2 rounded-full bg-red-600/20 text-red-400 border border-red-500/30 text-sm font-bold shadow-md animate-pulse">
                          ⚠️ Overdue
                        </span>
                      </div>
                    )
                  }

                </span>

              </div>

            </div>

          )

        }

      </div>

      {/* RIGHT SIDE BUTTONS */}

      <div className="flex gap-3 flex-wrap">

        {/* EDIT */}

        <button
          onClick={() =>
            startEdit(t)
          }
          className="px-5 py-2 rounded-xl bg-yellow-500 hover:bg-yellow-600 transition-all duration-300 font-semibold shadow-lg"
        >

          Edit

        </button>

        {/* DELETE */}

        <button
          onClick={() =>
            removeSubject(t._id)
          }

          disabled={
            deleteLoading === t._id
          }

          className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 transition-all duration-300 font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >

          {
            deleteLoading === t._id
              ? "Deleting..."
              : "Delete"
          }

        </button>

        {/* DONE / UNDO */}

        <button
          onClick={() =>
            MarkAsDone(t)
          }
          className={`px-5 py-2 rounded-xl transition-all duration-300 font-semibold shadow-lg ${
            t.completed
              ? "bg-slate-600 hover:bg-slate-700"
              : "bg-cyan-600 hover:bg-cyan-700"
          }`}
        >

          {
            t.completed
              ? "Undo"
              : "Done"
          }

        </button>

      </div>

    </li>

  );

}

export default SubjectItem;