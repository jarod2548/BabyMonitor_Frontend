import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateGroupModal } from "../../components/CreateGroupModal";
import { groupService } from "../../Services/GroupService";
import type { maakGroepRequest } from "../../contracts/maakGroepRequest";



export default function Classes() {

  const [classCode, setClassCode] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);

  const navigate = useNavigate();

  const handleJoin = () => {
    if (!classCode.trim()) return;

    console.log("Joining class:", classCode);

    navigate("/student/lessons");
  };


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
    </div>
  );
}
