import { useEffect, useState } from "react";

import toast from "react-hot-toast";

function PomodoroTimer() {

  // ================= TIMER STATE =================

  const [minutes, setMinutes] =
    useState(25);

  const [inputMinutes, setInputMinutes] =
    useState(25);

  const [hasStarted, setHasStarted] =
    useState(false);

  const [seconds, setSeconds] =
    useState(0);

  const [isActive, setIsActive] =
    useState(false);

  
  // ================= TIMER LOGIC =================

  useEffect(() => {

    let interval = null;

    if (isActive) {

      interval = setInterval(() => {

        if (seconds > 0) {

          setSeconds(
            seconds - 1
          );

        }

        if (
          seconds === 0
        ) {

          if (minutes === 0) {

            clearInterval(
              interval
            );

            setIsActive(false);

            toast.success(
              "Pomodoro Session Completed 🎉"
            );

          }

          else {

            setMinutes(
              minutes - 1
            );

            setSeconds(59);

          }

        }

      }, 1000);

    }

    return () =>
      clearInterval(interval);

  }, [isActive, seconds, minutes]);

  // ================= START =================

  const startTimer = () => {
    if (!hasStarted) {

      setMinutes(
        Number(inputMinutes)
      );

      setSeconds(0);

      setHasStarted(true);
    }
    setIsActive(true);
  };

  // ================= PAUSE =================

  const pauseTimer = () => {

    setIsActive(false);

  };

  // ================= RESET =================

  const resetTimer = () => {

    setIsActive(false);

    setHasStarted(false);

    setMinutes(Number(inputMinutes));

    setSeconds(0);

  };

  return (

    <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 shadow-2xl mb-10 text-center">

      {/* TITLE */}

      <h2 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-8">

        🍅 Pomodoro Timer

      </h2>

      <div className="mb-6">

      <input
        type="number"
        min="1"
        value={inputMinutes}
        onChange={(e) => {
          setInputMinutes(e.target.value);
          setMinutes(e.target.value);
          setSeconds(0);
          setHasStarted(false);
          setIsActive(false);
        }}
        className="w-40 p-3 rounded-2xl bg-slate-800 border border-slate-700 text-white text-center outline-none focus:ring-2 focus:ring-cyan-500"
        placeholder="Enter Minutes"
      />

</div>

      {/* TIMER */}

      <div className="text-7xl font-bold text-white mb-8 tracking-widest">

        {String(minutes).padStart(2, "0")}
        :
        {String(seconds).padStart(2, "0")}

      </div>

      {/* BUTTONS */}

      <div className="flex flex-wrap justify-center gap-4">

        <button
          onClick={startTimer}
          className="px-6 py-3 rounded-2xl bg-green-600 hover:bg-green-700 transition-all duration-300 font-semibold shadow-lg"
        >

          Start

        </button>

        <button
          onClick={pauseTimer}
          className="px-6 py-3 rounded-2xl bg-yellow-500 hover:bg-yellow-600 transition-all duration-300 font-semibold shadow-lg"
        >

          Pause

        </button>

        <button
          onClick={resetTimer}
          className="px-6 py-3 rounded-2xl bg-red-600 hover:bg-red-700 transition-all duration-300 font-semibold shadow-lg"
        >

          Reset

        </button>

      </div>

    </div>

  );

}

export default PomodoroTimer;