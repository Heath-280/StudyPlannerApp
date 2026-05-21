import { useState, useEffect } from "react";

import FilterButton from "../components/FilterButton";
import SearchBar from "../components/SearchBar";
import SubjectForm from "../components/SubjectForm";
import SubjectList from "../components/SubjectList";
import Stats from "../components/Stats";
import Navbar from "../components/Navbar";

import PomodoroTimer from "../components/PomodoroTimer";

import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";

import {
  createStudy,
  getStudy,
  updateStudy,
  deleteStudy
} from "../api/studyApi";

function Home() {

  // ================= STATES =================

  const [subject, setSubject] = useState("");

  const [duration, setDuration] = useState("");

  const [editIndex, setEditIndex] = useState("");

  const [editedSubject, seteditedSubject] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const [filter, setfilter] = useState("all");

  const [subjectAdd, setsubjectAdd] = useState([]);

  const [loading,setLoading] = useState(false);
  const [deleteLoading,setDeleteLoading] = useState("");

  const [dueDate, setDueDate] = useState("");

  const [priority, setPriority] = useState("Medium");

  const navigate = useNavigate();

  // ================= FETCH STUDIES =================

  useEffect(() => {
    fetchStudies();
  }, []);

  const fetchStudies = async () => {
    try {
      const response = await getStudy();
      setsubjectAdd(response.studies);
    }
    catch (error) {
      console.log(error);
    }
  };

  // ================= INPUT HANDLERS =================

  const inputHandle = (e) => {
    setSubject(e.target.value);
  };

  const durationHandle = (e) => {
    setDuration(e.target.value);
  };

  // ================= CREATE STUDY =================

  const addsubject = async () => {

    if (subject.trim() === "") return;
    if (duration.trim() === "") return;

    try {

      setLoading(true);

      await createStudy({
        title: subject,
        description: "Study Task",
        duration,
        dueDate,
        priority
      });

      toast.success("Study Added");

      setSubject("");
      setDuration("");
      setDueDate("");
      setPriority("Medium");

      fetchStudies();

      setLoading(false);

    }
    catch (error) {

      setLoading(false);

      console.log(error);

    }
  };

  // ================= DELETE STUDY =================

  const removeSubject = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this study?"
    );

    if(!confirmDelete) return;

    try {
      setDeleteLoading(id);

      await deleteStudy(id);

      toast.success("Study Deleted");

      fetchStudies();

      setDeleteLoading("");

    }
    catch (error) {

      setDeleteLoading("");

     console.log(error);
    }
  };

  // ================= MARK AS DONE =================

  const MarkAsDone = async (currItem) => {

    try {
      await updateStudy(
        currItem._id,
        {
          completed:
            !currItem.completed
        }
      );
      fetchStudies();
    }
    catch (error) {
      console.log(error);
    }
  };

  // ================= START EDIT =================

  const startEdit = (currItem) => {
    seteditedSubject(currItem.title);
    setEditIndex(currItem._id);
  };

  // ================= SAVE EDIT =================

  const saveEdit = async (id) => {
    try {
      await updateStudy(
        id,
        {
          title: editedSubject
        }
      );

      toast.success("Study Updated");

      setEditIndex("");
      seteditedSubject("");
      fetchStudies();
    }
    catch (error) {
      console.log(error);
    }
  };

  // ================= FILTERED SUBJECTS =================

  const filteredSubjects = subjectAdd.filter((currItem) => {
      if (
        filter === "completed" &&
        !currItem.completed
      ) {
        return false;
      }

      if (
        filter === "pending" &&
        currItem.completed
      ) {
        return false;
      }

      return currItem.title
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        );

    });

    const dueDateHandle = (e) => {
      setDueDate(e.target.value);
    };

    const priorityHandle = (e) => {
      setPriority(e.target.value);
    };

  // ================= UI =================

  return (
    <>

    <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white px-4 py-10">

      <div className="max-w-5xl mx-auto">

        {/* Heading */}

        <div className="text-center mb-10">

          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">

            Study Planner

          </h1>

          <p className="text-slate-400 text-lg">

            Plan your learning like a pro 🚀

          </p>

        </div>

          {/* Pomodoro Timer */}

          <PomodoroTimer />

        {/* Form Section */}

        <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700 rounded-3xl shadow-2xl p-6 mb-8">

          <SubjectForm
            subject={subject}
            duration={duration}
            dueDate={dueDate}
            priority={priority}
            inputHandle={inputHandle}
            durationHandle={durationHandle}
            dueDateHandle={dueDateHandle}
            priorityHandle={priorityHandle}
            addsubject={addsubject}
            loading={loading}
          />

        </div>

        {/* Search + Filter */}

        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">

          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />

          <FilterButton
            setFilter={setfilter}
            filter={filter}
          />

        </div>

        {/* Subject List */}

        <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700 rounded-3xl shadow-2xl p-6 mb-8">

          <SubjectList
            filteredSubjects={filteredSubjects}
            editedSubject={editedSubject}
            editIndex={editIndex}
            seteditedSubject={seteditedSubject}
            saveEdit={saveEdit}
            startEdit={startEdit}
            removeSubject={removeSubject}
            MarkAsDone={MarkAsDone}
            deleteLoading={deleteLoading}
          />

        </div>

        {/* Stats */}

        <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700 rounded-3xl shadow-2xl p-6">

          <Stats subjectAdd={subjectAdd} />

        </div>

      </div>

    </div>

    </>

  );

}

export default Home;