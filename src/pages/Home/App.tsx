import {  Route, Routes, useNavigate } from "react-router-dom";
import { wsService } from "../../WebSocketService";
import Dashboard from "../Dashboard_Docent/Dashboard_Docent";
import Student from "../Dashboard_Student/Dashboard_Student";


function Home() {
  const navigate = useNavigate();


  const goToTeacher = () => {
    wsService.connect(() => {
      navigate("/teacher");
    });
  };
  const goToTeacherDev = () => {
      navigate("/teacher");
  };
  const goToStudent = () => {
      navigate("/student");
  };

  return (
    <div>
      <h1>Welcome to Baby Monitor</h1>
      <button onClick={goToTeacher}>Leraar</button>
      <button onClick={goToTeacherDev}>Leraar DEVOLEPMENT</button>
      <button onClick={goToStudent}>Student</button>
    </div>
  );

}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/teacher" element={<Dashboard />} />
      <Route path="/student" element={<Student />} />
    </Routes>
  );
}

export default App;


