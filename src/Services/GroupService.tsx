import axios from "axios";
import type { Group } from "../contracts/Group";
import type { maakGroepRequest } from "../contracts/maakGroepRequest";

export class GroupService {

     fakeGroepen : Group[] = [
        { groepId: "1", naam: "Groep A" },
        { groepId: "2", naam: "Groep B" },
        { groepId: "1", naam: "Groep A" },
        { groepId: "2", naam: "Groep B" },
    ];

    async createGroup(groepRequest : maakGroepRequest) {
        console.log(groepRequest);
        const response = await axios.post("/api/groepen", groepRequest);
        console.log(response);
        return response;
    }
    
    async getGroups(){
        return await axios.get("/api/groepen");
    }
    async getFakeGroups(){
        return await this.fakeGroepen;
    }
    leaveGroupOnUnload() {
        const id = localStorage.getItem("groupId");
        if (!id) return;

        const url = `/api/leaveGroup/${id}`;
        navigator.sendBeacon(url);
    }

    joinGroup(groepId : string){
        return axios.put("/api/joinGroup", groepId);
    }
}
export const groupService = new GroupService();