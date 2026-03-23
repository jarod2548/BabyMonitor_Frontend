import axios from "axios";
import type { Group } from "../contracts/Group";

export class GroupService {

     fakeGroepen : Group[] = [
        { groepId: "1", groepNaam: "Groep A" },
        { groepId: "2", groepNaam: "Groep B" },
    ];

    async createGroup(groepNaam: string) {
        const response = await axios.post("/api/createGroup", groepNaam);
        return response;
    }
    
    async getGroups(){
        return await axios.get("/api/groepen");
    }
    async getFakeGroups(){
        return await this.fakeGroepen;
    }
    leaveGroup(groepId : string){
        return axios.delete(`/api/leaveGroup/${groepId}`);
    }

    joinGroup(groepId : string){
        return axios.put("/api/joinGroup", groepId);
    }
}
export const groupService = new GroupService();