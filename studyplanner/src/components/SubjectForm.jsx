function SubjectForm({
  subject,
  duration,
  inputHandle,
  durationHandle,
  addsubject,
  loading,
  dueDate,
  dueDateHandle,
  priority,
  priorityHandle
}) {

  return (

    <div className="space-y-5">

      <h1 className="text-3xl font-bold text-center text-white mb-6">

        Add Study Task

      </h1>

      {/* Subject Input */}

      <input
        type="text"
        placeholder="Enter Subject"
        value={subject}
        onChange={inputHandle}
        className="w-full p-4 rounded-2xl bg-slate-900 border border-slate-700 text-white outline-none focus:ring-2 focus:ring-cyan-500"
      />

      {/* Duration Input */}

      <input
        type="number"
        placeholder="Enter Duration (Hours)"
        value={duration}
        onChange={durationHandle}
        className="w-full p-4 rounded-2xl bg-slate-900 border border-slate-700 text-white outline-none focus:ring-2 focus:ring-cyan-500"
      />

      {/* Due Date Input */}

      <input
        type="date"
        placeholder="Select Due Date"
        value={dueDate}
        onChange={dueDateHandle}
        className="w-full p-4 rounded-2xl bg-slate-900 border border-slate-700 text-white outline-none focus:ring-2 focus:ring-cyan-500"
      />

      {/* Priority Input */}
      <select 
        value={priority}
        onChange={priorityHandle}
        className="w-full p-4 rounded-2xl bg-slate-900 border border-slate-700 text-white outline-none focus:ring-2 focus:ring-cyan-500"
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      {/* Add Button */}

      <button
        onClick={addsubject}
        disabled={loading}
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-[1.02] transition-all duration-300 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >

        {
          loading ? "Adding..." : "Add Subject"
        }

      </button>

    </div>

  );

}

export default SubjectForm;