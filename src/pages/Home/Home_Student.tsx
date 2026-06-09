import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { groupService } from "../../Services/GroupService";
import { heartbeatService } from "../../Services/HeartbeatService";
import type { GroupResponse } from "../../contracts/Group";
import type { HeartbeatData } from "../../contracts/HeartbeatData";
import { wsService } from "../../WebSocketService";
import { JoinGroupModal } from "./JoinGroupModal";
import "./App.css";

interface HomeStudentProps {
  embedded?: boolean;
}

function Home_Student({ embedded = false }: HomeStudentProps) {
  const navigate = useNavigate();
  const [joinVisible, setJoinVisible] = useState(false);
  const [groepen, setGroepen] = useState<GroupResponse[]>([]);

  const fetchGroepen = async () => {
    try {
      const response = await groupService.getGroups();
      setGroepen(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleJoinGroup = async () => {
    if (!joinVisible) {
      await fetchGroepen();
    }

    setJoinVisible((prev) => !prev);
  };

  const heartbeatReceived = (data: HeartbeatData) => {
    heartbeatService.heartbeatReceived(data);
  };

  const goToStudent = (groepId: string) => {
    wsService.subscribe<HeartbeatData>(`/topic/heartbeat/${groepId}`, heartbeatReceived);
    navigate("/student");
  };

  const content = (
    <>
      <button onClick={toggleJoinGroup}>Doe mee als student</button>
      {joinVisible && (
        <JoinGroupModal
          groepen={groepen}
          onSelectGroup={goToStudent}
          onClose={toggleJoinGroup}
        />
      )}
    </>
  );

  if (embedded) {
    return content;
  }

  return <div className="button-group">{content}</div>;
}

export default Home_Student;
