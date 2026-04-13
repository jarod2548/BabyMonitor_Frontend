import { Route, Routes } from "react-router-dom";
import Dashboard from "../Dashboard_Docent/Dashboard_Docent";
import Student from "../Dashboard_Student/Dashboard_Student";
import Login from "../Login/Login";
import { ProtectedRoute } from "../../security/ProtectedRoute";
import { useAuth } from "./useAuth";

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
import Home from "./Home";
import Home_Docent from "./Home_Docent";

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
      <Route path="/" element={<Home />} />
      <Route path="/home_docent" element={<Home_Docent />} />
      <Route path="/teacher" element={<Dashboard />} />
      <Route path="/student" element={<Student />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
