import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { registerUser } from "../api/authApi";

function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [loading,setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/home");
    }
  },[]);

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const response = await registerUser(form);

      toast.success(response.message);

      navigate("/login");

    }

    catch (error) {

      setLoading(false);
      toast.error(error.response.data.message);

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4">

      <div className="w-full max-w-md bg-slate-800/40 backdrop-blur-xl border border-slate-700 rounded-3xl shadow-2xl p-8">

        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

          Register

        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="text"
            placeholder="Enter Username"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value
              })
            }
            className="w-full p-4 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:ring-2 focus:ring-cyan-500"
          />

          <input
            type="email"
            placeholder="Enter Email"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value
              })
            }
            className="w-full p-4 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:ring-2 focus:ring-cyan-500"
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value
              })
            }
            className="w-full p-4 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:ring-2 focus:ring-cyan-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-[1.02] transition-all duration-300 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >

            {
              loading ? "Registering..." : "Register"
            }

          </button>

        </form>

      </div>

    </div>

  );

}

export default Register;