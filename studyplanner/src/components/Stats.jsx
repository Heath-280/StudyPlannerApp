function Stats({ subjectAdd }) {

  const totalSubjects =
    subjectAdd.length;

  const completedSubjects =
    subjectAdd.filter(
      (currItem) =>
        currItem.completed
    ).length;

  const pendingSubjects =
    totalSubjects -
    completedSubjects;

  return (

    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

      {/* Total */}

      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-lg text-center">

        <h2 className="text-slate-400 text-lg mb-2">

          Total Subjects

        </h2>

        <p className="text-4xl font-bold text-cyan-400">

          {totalSubjects}

        </p>

      </div>

      {/* Completed */}

      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-lg text-center">

        <h2 className="text-slate-400 text-lg mb-2">

          Completed

        </h2>

        <p className="text-4xl font-bold text-green-400">

          {completedSubjects}

        </p>

      </div>

      {/* Pending */}

      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-lg text-center">

        <h2 className="text-slate-400 text-lg mb-2">

          Pending

        </h2>

        <p className="text-4xl font-bold text-yellow-400">

          {pendingSubjects}

        </p>

      </div>

    </div>

  );

}

export default Stats;