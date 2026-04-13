import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { groupService } from "../../Services/GroupService";
import { heartbeatService } from "../../Services/HeartbeatService";
import type { HeartbeatData } from "../../contracts/HeartbeatData";
import type { maakGroepRequest } from "../../contracts/maakGroepRequest";
import { wsService } from "../../WebSocketService";
import { CreateGroupModal } from "./CreateGroupModal";
import "./Home_Docent.css";
import "./App.css";

interface HomeDocentActionProps {
  embedded?: boolean;
}

export function HomeDocentAction({ embedded = false }: HomeDocentActionProps) {
  const navigate = useNavigate();
  const [creationVisible, setCreationVisible] = useState(false);

  const toggleCreateGroup = () => setCreationVisible((prev) => !prev);

  const heartbeatReceived = (data: HeartbeatData) => {
    heartbeatService.heartbeatReceived(data);
  };

  const goToTeacher = async (groepNaam: string) => {
    try {
      await wsService.connect();

      const groupRequest: maakGroepRequest = {
        naam: groepNaam,
      };

      const groupResponse = await groupService.createGroup(groupRequest);
      localStorage.setItem("groupId", groupResponse.data.id);
      wsService.subscribe<HeartbeatData>(
        `/heartbeat/${groupResponse.data.id}`,
        heartbeatReceived,
      );
      navigate("/teacher");
    } catch (error) {
      console.log(error);
    }
  };

  const content = (
    <>
      <button onClick={toggleCreateGroup}>Start een groep als docent</button>
      {creationVisible && (
        <CreateGroupModal onClose={toggleCreateGroup} onCreateGroup={goToTeacher} />
      )}
    </>
  );

  if (embedded) {
    return content;
  }

  return <div className="button-group">{content}</div>;
}

function Home_Docent() {
  return (
    <div className="Home_Docent">
      <h1>Home Dashboard</h1>
    </div>
  );
}

export default Home_Docent;
