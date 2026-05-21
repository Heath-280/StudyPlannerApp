import SubjectItem from "./SubjectItem";

function SubjectList({
  filteredSubjects,
  editedSubject,
  editIndex,
  seteditedSubject,
  saveEdit,
  startEdit,
  removeSubject,
  MarkAsDone,
  deleteLoading
}) {

  if (filteredSubjects.length === 0) {

    return (

      <div className="text-center py-16">

        <h2 className="text-3xl font-bold text-slate-300 mb-4">

          📚 No Studies Found

        </h2>

        <p className="text-slate-500 text-lg">

          Add your first study task and start learning 🚀

        </p>

      </div>

    );

  }

  return (

    <ul className="space-y-4">

      {
        filteredSubjects.map((t) => (

          <SubjectItem

            key={t._id}

            t={t}

            editedSubject={editedSubject}

            editIndex={editIndex}

            seteditedSubject={seteditedSubject}

            saveEdit={saveEdit}

            startEdit={startEdit}

            removeSubject={removeSubject}

            MarkAsDone={MarkAsDone}

            deleteLoading={deleteLoading}

          />

        ))
      }

    </ul>

  );

}

export default SubjectList;