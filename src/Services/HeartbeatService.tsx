import type { HeartbeatData } from "../contracts/HeartbeatData";
import axios from "axios";


export class HeartbeatService {

    updateHeartbeat = (data: HeartbeatData, groupId : string) =>
  axios.post("/api/heartbeat", {data, groupId});

}

  export const heartbeatService = new HeartbeatService();


