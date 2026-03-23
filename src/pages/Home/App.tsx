import {  Route, Routes, useNavigate } from "react-router-dom";
import { wsService } from "../../WebSocketService";
import Dashboard from "../Dashboard_Docent/Dashboard_Docent";
import Student from "../Dashboard_Student/Dashboard_Student";
import { groupService } from "../../Services/GroupService";
import { useState } from "react";


function Home() {
  const navigate = useNavigate();

  const [inputVisible, setInputVisible] = useState(false);

  const toggleInput = () => setInputVisible(prev => !prev);

  const goToTeacher = async () => {
    try{
      const groupResponse = await groupService.createGroup("groep");
      localStorage.setItem("groupId", groupResponse.data);
      wsService.connect(() => {
      navigate("/teacher");
    });
    }catch(error){
      console.log(error);
    }
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
      <button
        style={{ position: "absolute", top: 20, right: 20, zIndex: 1000 }}
        onClick={toggleInput}
      >
        {inputVisible ? "Hide Input" : "Show Input"}
      </button>

      {/* Hidden / visible input overlay */}
      <input
        type="text"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "70vw",
          height: "70vw",
          opacity: inputVisible ? 1 : 0, // toggle visibility
          zIndex: 9999,
          border: inputVisible ? "2px solid blue" : "none",
          outline: inputVisible ? "auto" : "none",
          background: inputVisible ? "rgba(255,255,255,0.2)" : "transparent",
        }}
        autoFocus={inputVisible}
      />
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


