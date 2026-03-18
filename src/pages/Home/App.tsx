import {  Route, Routes, useNavigate } from "react-router-dom";
import { useWebSocket } from "../../WebContext";
import Dashboard from "../Dashboard_Docent/Dashboard_Docent";
import Student from "../Dashboard_Student/Dashboard_Student";


function Home() {
  const navigate = useNavigate();
  const { connect} = useWebSocket();

  const handleStart = () => {
    connect(() => {
      navigate("/dashboard");
    });
  };

  return (
    <div>
      <h1>Welcome to Baby Monitor</h1>
      <button onClick={handleStart}>Go to Dashboard</button>
    </div>
  );

}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/student" element={<Student />} />
    </Routes>
  );
}

export default App;


