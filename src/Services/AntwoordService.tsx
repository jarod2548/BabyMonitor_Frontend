import axios from "axios";
import type { AntwoordDTO } from "../contracts/Course/AntwoordDTO";
import type { AntwoordReponseDTO } from "../contracts/Course/AntwoordResponseDTO";

export class AntwoordService{

    async maakAntwoord(data : AntwoordDTO){
        try{
            const response = await axios.post("/api/teacher/vraag", data);
            if(response.status === 201){
                const responseData : AntwoordReponseDTO = response.data;
                return responseData;
            }else{
                return null;
            }
        }catch(error){
            console.log(error);
            return null;
        }
    }

    async leesAntwoorden(){
        try{
            const response = await axios.get("/api/teacher/vraag");
            if(response.status === 200){
                const responseData : AntwoordReponseDTO[] = response.data;
                return responseData;
            }
            return null;
        }
        catch(error){
            console.log(error);
            return null;
        }
    }

    validateAntwoord(data : AntwoordDTO){
        if(!data.tekst){
            return "tekst moet ingevuld zijn";
        }
        return null;
    }
}
export const antwoordService = new AntwoordService(); 