import { Route, Routes } from "react-router-dom";
import Dashboard from "../Dashboard_Docent/Dashboard_Docent";
import Student from "../Dashboard_Student/Dashboard_Student";
import Login from "../Login/Login";
import Home from "./Home";
import Home_Docent from "./Home_Docent";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home_docent" element={<Home_Docent />} />
      <Route path="/teacher" element={<Dashboard />} />
      <Route path="/student" element={<Student />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
