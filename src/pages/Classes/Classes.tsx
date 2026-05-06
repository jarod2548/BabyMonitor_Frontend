import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Classes() {
  const [classCode, setClassCode] = useState("");
  const navigate = useNavigate();

  const handleJoin = () => {
    if (!classCode) return;

    console.log("Joining class:", classCode);

    // TODO: connect to backend / websocket
    navigate("/student/lessons");
  };

  return (
    <div>
      <h1>Join a Class</h1>
      <input
        value={classCode}
        onChange={(e) => setClassCode(e.target.value)}
        placeholder="Enter class code"
      />
      <button onClick={handleJoin}>Join</button>
    </div>
  );
}