import axios from "axios";
import type { VraagDTO } from "../contracts/Course/VraagDTO";
import type { VraagReponseDTO } from "../contracts/Course/VraagResponseDTO";

export class VraagService{

    async maakVraag(data : VraagDTO){
        try{
            const response = await axios.post("/api/teacher/vraag", data);
            if(response.status === 201){
                const responseData : VraagReponseDTO = response.data;
                return responseData;
            }else{
                return null;
            }
        }catch(error){
            console.log(error);
            return null;
        }
    }

    async leesVragen(){
        try{
            const response = await axios.get("/api/teacher/vraag");
            if(response.status === 200){
                const responseData : VraagReponseDTO[] = response.data;
                return responseData;
            }
            return null;
        }
        catch(error){
            console.log(error);
            return null;
        }
    }

    validateVraag(data : VraagDTO){
        if(!data.tekst){
            return "tekst moet ingevuld zijn";
        }
        return null;
    }
}
export const vraagService = new VraagService(); 