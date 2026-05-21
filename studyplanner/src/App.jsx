import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import ProtectedRoute from "./components/ProtectedRoute";

import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import "./App.css";

function App() {

  return (

    <Routes>
      <Route
        path="/"
       element={<Navigate to="/register" />}
       />



      {/* Public Routes */}

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      {/* Protected Route */}

      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

    </Routes>

  );

}

export default App;