import type { HeartbeatData } from "../contracts/HeartbeatData";
import axios from "axios";


export class HeartbeatService {


  updateHeartbeat (data: HeartbeatData) {
    const groupId = localStorage.getItem("groupId");
    if(!groupId) return;
    axios.post("/api/heartbeat", {data, groupId});
  }

  heartbeatReceived (data : HeartbeatData) {
    console.log(data);
  }
}

  export const heartbeatService = new HeartbeatService();


