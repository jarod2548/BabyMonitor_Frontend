import axios from "axios";

export class GroupService {
   // private groupId: string | null = null;

    createGroup = (groepNaam : string) => {
        axios.post("/api/heartbeat", {groepNaam});
    }
}
export const groupService = new GroupService();