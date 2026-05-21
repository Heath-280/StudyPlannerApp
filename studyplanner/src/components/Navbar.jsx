import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast"

function Navbar(){
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        toast.success("Logged Out");
        navigate("/login");
    };

    return (

    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-slate-900/70 border-b border-slate-800 shadow-lg">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}

        <div>

          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

            Study Planner

          </h1>

          <p className="text-slate-400 text-sm">

            Track your learning journey 🚀

          </p>

        </div>

        {/* Right Side */}

        <div className="flex items-center gap-4">

          <button
            onClick={handleLogout}
            className="px-5 py-2 rounded-2xl bg-red-600 hover:bg-red-700 transition-all duration-300 font-semibold shadow-lg"
          >

            Logout

          </button>

        </div>

      </div>

    </nav>
    );
}

export default Navbar;