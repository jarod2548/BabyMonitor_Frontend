import { Routes, Route } from "react-router-dom";
import Dashboard from "../Dashboard_Docent/Dashboard_Docent";

function Home() {
  return (
    <div>
      <h1>Welcome to Baby Monitor</h1>
      <a href="/dashboard">Go to Dashboard</a>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;