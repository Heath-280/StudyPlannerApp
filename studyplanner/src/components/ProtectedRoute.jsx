import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

  // Get JWT Token
  const token = localStorage.getItem("token");

  // Redirect If Not Logged In
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Render Protected Page
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {children}
    </div>
  );
}

export default ProtectedRoute;