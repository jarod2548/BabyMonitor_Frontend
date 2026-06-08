import axios from "axios";
import type { maakGroepRequest } from "../contracts/maakGroepRequest";
import { wsService } from "../WebSocketService";
import type { GroupResponse } from "../contracts/Group";

export class GroupService {


    async createGroup(groepRequest : maakGroepRequest) {
        try{
            const response = await axios.post("/api/teacher/groep", groepRequest);
        if(response.status === 201){
            const responseData : GroupResponse = response.data;
            return responseData;
        }
        }
        catch{
            return null
        }
        
        return null;
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