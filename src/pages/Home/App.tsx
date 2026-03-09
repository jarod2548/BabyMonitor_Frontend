import { Routes, Route } from "react-router-dom";
import Dashboard from "../Dashboard_Docent/Dashboard_Docent";
import Student from "../Dashboard_Student/Dashboard_Student";

function Home() {
  return (
    <div>
      <h1>Welcome to Baby Monitor</h1>
      <a href="/dashboard">Go to Dashboard</a>
    <div>
      <a href="/student">Go to Student environment</a>
    </div>
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