import {  Route, Routes, useNavigate } from "react-router-dom";
import { wsService } from "../../WebSocketService";
import Dashboard from "../Dashboard_Docent/Dashboard_Docent";
import Student from "../Dashboard_Student/Dashboard_Student";
import { groupService } from "../../Services/GroupService";
import { useState } from "react";
import './App.css';
import type { Group } from "../../contracts/Group";

function Home() {
  const navigate = useNavigate();

  const [creationVisible, setCreationVisible] = useState(false);
  const [joinVisible, setJoinVisible] = useState(false);
  const [groepen, setGroepen] = useState<Group[]>([])

  const showCreateGroup = () => setCreationVisible(prev => !prev);
  const showJoinGroup = async () => {
    await fetchGroepen();
    setJoinVisible(prev => !prev);
  }

  const fetchGroepen = async () => {
    try {
      const response = await groupService.getFakeGroups();
      setGroepen(response);
    } catch (error) {
      console.log(error);
    }
  }

  const goToTeacher = async () => {
    try{
      await wsService.connect();
      const groupResponse = await groupService.createGroup("groep");
      localStorage.setItem("groupId", groupResponse.data);
      navigate("/teacher");
    }
    catch(error){
      console.log(error);
    }
  };
  const goToTeacherDev = () => {
      navigate("/teacher");
  };
  const goToStudent = (groepId : string) => {
    console.log("Clicked group:", groepId);
      navigate("/student");
  };



  return (
    <div>
      <h1>Welcome to Baby Monitor</h1>
      <button onClick={goToTeacher}>Leraar</button>
      <button onClick={goToTeacherDev}>Leraar DEVOLEPMENT</button>
      <button
        style={{ position: "absolute", top: 20, right: 20, zIndex: 1000 }}
        onClick={showCreateGroup}
      >
      </button>
      <button
        style={{ position: "absolute", top: 80, right: 20, zIndex: 1000 }}
        onClick={showJoinGroup}
      >
      </button>

                {creationVisible && (
            <div className="overlay">
              <div className="modal-box">
                <h1>Voer een groeps naam in</h1>
                <input type="text" placeholder="groepnaam" autoFocus required/>
                <button>Start als leraar</button>
                <button 
                  onClick={showCreateGroup}
                >Ga terug
                </button>
              </div>
            </div>
          )}
          {joinVisible && (
            <div className="overlay">
              <div className="modal-box">
                <h1>Doe mee met een groep</h1>
                <div>
                  {groepen.map(g => (
                    <button key={g.groepId} onClick={() => goToStudent(g.groepId)}>
                      {g.groepNaam}
                    </button>
                  ))}
                </div>
                <button 
                  onClick={showJoinGroup}
                >Ga terug
                </button>
              </div>
            </div>
          )}
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


