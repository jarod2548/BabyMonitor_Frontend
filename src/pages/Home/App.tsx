import { Route, Routes } from "react-router-dom";
import Dashboard from "../Dashboard_Docent/Dashboard_Docent";
import Student from "../Dashboard_Student/Dashboard_Student";
import Login from "../Login/Login";
import Home from "./Home";
import Home_Docent from "./Home_Docent";
import { ProtectedRoute } from "../../security/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/teacher"
        element={
          <ProtectedRoute role="TEACHER">
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/home_docent"
        element={
          <ProtectedRoute role="TEACHER">
            <Home_Docent/>
          </ProtectedRoute>
        }
      />
      <Route
        path="/student"
        element={
          <ProtectedRoute role="STUDENT">
            <Student />
          </ProtectedRoute>
        }
      />

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
