import axios from "axios";

export class GroupService {

    createGroup(groepNaam : string){
        return axios.post("/api/createGroup", groepNaam);
    }

    leaveGroup(groepId : string){
        return axios.post("/api/leaveGroup", groepId);
    }

    joinGroup(groepId : string){
        return axios.post("/api/joinGroup", groepId);
    }
}
export const groupService = new GroupService();