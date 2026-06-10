import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateGroupModal } from "../../components/CreateGroupModal";
import { groupService } from "../../Services/GroupService";
import type { maakGroepRequest } from "../../contracts/maakGroepRequest";
import type { GroupResponse } from "../../contracts/GroupResponse";



export default function Classes() {

  const [classCode, setClassCode] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [classes, setClasses] = useState<GroupResponse[]>([]);

  const navigate = useNavigate();

  const handleJoin = () => {
    if (!classCode.trim()) return;

    console.log("Joining class:", classCode);

    navigate("/student/lessons");
  };

  useEffect(() => {
  const fetchGroups = async () => {
    try {
      const data = await groupService.getGroups();
      setClasses(data);
    } catch (error) {
      console.error("Failed to load groups", error);
    }
  };

  fetchGroups();
}, []);


  const handleCreateGroup = async (request: maakGroepRequest) => {
  try {
    const Groep = await groupService.createGroup(request);
    if(Groep != null){
      setShowCreateModal(false);
      navigate(`/teacher_class/${Groep.id}`);
    }else{
      alert("Kon groep niet aanmaken.");
    }
  } catch (error) {
    console.error("Failed to create group", error);
    alert("Kon groep niet aanmaken.");
  }
};

const joinGroup = async(groepId: string) => {
  navigate(`/student_class/${groepId}`);
}

  return (
    <div>
      <h1>Join a Class</h1>

      <input
        value={classCode}
        onChange={(e) => setClassCode(e.target.value)}
        placeholder="Enter class code"
      />

      <button onClick={handleJoin}>Join</button>

      <hr />

      <button onClick={() => setShowCreateModal(true)}>
        Maak groep aan als leraar
      </button>

      {showCreateModal && (
        <CreateGroupModal
          onClose={() => setShowCreateModal(false)}
          onCreateGroup={handleCreateGroup}
        />
      )}

            <hr />

      <h2>Your Classes</h2>

      {classes.length === 0 ? (
        <p>No classes found</p>
      ) : (
        <ul>
          {classes.map((group) => (
            <li key={group.id}>
              {group.naam}

              <button
                onClick={() => joinGroup(group.id)}
                style={{ marginLeft: "10px" }}
              >
                Join
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
