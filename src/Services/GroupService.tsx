import axios from "axios";
import type { maakGroepRequest } from "../contracts/maakGroepRequest";
import { wsService } from "../WebSocketService";

export class GroupService {


    async createGroup(groepRequest : maakGroepRequest) {
        console.log(groepRequest);
        const response = await axios.post("/api/groep", groepRequest);
        console.log(response);
        return response;
    }
    
    async getGroups(){
        const response = await axios.get("/api/user/groep");
        console.log(response);
        return response;
    }
    leaveGroupOnUnload() {
        const id = localStorage.getItem("groupId");
        if (!id) return;

        wsService.unsubscribe(`/topic/group/${id}`);
    }
}
export const groupService = new GroupService();