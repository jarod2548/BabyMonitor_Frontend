import {  Route, Routes, useNavigate } from "react-router-dom";
import { wsService } from "../../WebSocketService";
import Dashboard from "../Dashboard_Docent/Dashboard_Docent";
import Student from "../Dashboard_Student/Dashboard_Student";
import { groupService } from "../../Services/GroupService";
import { useState } from "react";
import './App.css';
import type { Group } from "../../contracts/Group";
import { CreateGroupModal } from "./CreateGroupModal";
import { JoinGroupModal } from "./JoinGroupModal";
import type { maakGroepRequest } from "../../contracts/maakGroepRequest";
import type { HeartbeatData } from "../../contracts/HeartbeatData";
import { heartbeatService } from "../../Services/HeartbeatService";
import Login from "../Login/Login";
import { useAuth } from "./useAuth";
import { ProtectedRoute } from "../../security/ProtectedRoute";

function Home() {
  const navigate = useNavigate();
  const loggedIn = useAuth();

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
      const response = await groupService.getGroups();
      setGroepen(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const goToTeacher = async (GroepNaam : string) => {
    try{
      await wsService.connect();
      const groupRequest : maakGroepRequest = {
          naam: GroepNaam
      };
      const groupResponse = await groupService.createGroup(groupRequest);
      localStorage.setItem("groupId", groupResponse.data.id);
      wsService.subscribe<HeartbeatData>(`/heartbeat/${groupResponse.data.id}`, heartbeatReceived);
      navigate("/teacher");
    }
    catch(error){
      console.log(error);
    }
  };

  
  const heartbeatReceived = (data : HeartbeatData) => {
    heartbeatService.heartbeatReceived(data);
  }

  const goToStudent = (groepId : string) => {
    console.log("Clicked group:", groepId);
    wsService.subscribe<HeartbeatData>(`/topic/heartbeat/${groepId}`, heartbeatReceived);
      navigate("/student");
  };

  const goToLogin = () => {
    navigate("/login")
  }



  return (
    <div>
      <h1>Welcome to Baby Monitor</h1>
      <div className="button-group">
        <button onClick={showCreateGroup}>Start een groep als docent</button>
        <button onClick={showJoinGroup}>Doe mee als student</button>
        {loggedIn ? <p>Welcome</p> : <button onClick={goToLogin}>Login</button>
        }
      </div>

      {creationVisible && <CreateGroupModal onClose={showCreateGroup} onCreateGroup={goToTeacher}/>}
      {joinVisible && (
        <JoinGroupModal
          groepen={groepen}
          onSelectGroup={goToStudent}
          onClose={showJoinGroup}
        />
      )}
    </div>
  );
};
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


