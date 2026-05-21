import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { loginUser } from "../api/authApi";



function Login() {

  const [login, setLogin] = useState({
    email: "",
    password: ""
  });

  const [loading,setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token){
      navigate("/home");
    }
  },[]);

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const response = await loginUser(login);

      localStorage.setItem(
        "token",
        response.token
      );

      toast.success(response.message);
      setLoading(false);
      navigate("/home");

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

          Login

        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            placeholder="Enter Email"
            type="email"
            value={login.email}
            onChange={(e) =>
              setLogin({
                ...login,
                email: e.target.value
              })
            }
            className="w-full p-4 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:ring-2 focus:ring-cyan-500"
          />

          <input
            placeholder="Enter Password"
            type="password"
            value={login.password}
            onChange={(e) =>
              setLogin({
                ...login,
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
              loading ? "Logging In..." : "Login"
            }

          </button>

        </form>

      </div>

    </div>

  );

}

export default Login;