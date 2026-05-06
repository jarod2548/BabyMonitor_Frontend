import { Route, Routes } from "react-router-dom";
import Dashboard from "../Dashboard_Docent/Dashboard_Docent";
import Student from "../Dashboard_Student/Dashboard_Student";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Home from "./Home";
import Home_Docent from "./Home_Docent";
import Layout from "../../layout";
import Classes from "../Classes/Classes";
import Lessons from "../Courses/Courses";
import { ProtectedRoute } from "../../security/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected routes WITH layout */}
      <Route element={<Layout />}>
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
              <Home_Docent />
            </ProtectedRoute>
          }
        />

        <Route
          path="/classes"
          element={
            <ProtectedRoute role="USER">
              <Classes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lessons"
          element={
            <ProtectedRoute role="USER">
              <Lessons />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student"
          element={
            <ProtectedRoute role="USER">
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
      </Route>
    </Routes>
  );
}

export default App;