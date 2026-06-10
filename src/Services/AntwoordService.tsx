import axios from "axios";
import type { AntwoordDTO } from "../contracts/Course/AntwoordDTO";
import type { AntwoordReponseDTO } from "../contracts/Course/AntwoordResponseDTO";

export class AntwoordService{

    async maakAntwoord(data : AntwoordDTO){
        try{
            const response = await axios.post("/api/teacher/antwoord", data);
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

    async leesAntwoorden(courseID : number){
        try{
            const response = await axios.get(`/api/user/antwoord/${courseID}`);
            if(response.status === 200){
                const responseData : AntwoordReponseDTO[] = response.data;
                return responseData;
            }
            return [];
        }
        catch(error){
            console.log(error);
            return [];
        }
    }

    validateAntwoord(data: AntwoordDTO): string {
    let errors: string = '';

        if (!data.tekst || data.tekst.trim() === "") {
            errors = `Antwoord  mist tekst.`;
        }

    return errors; // Returns an empty array if everything is valid
}
}
export const antwoordService = new AntwoordService(); 