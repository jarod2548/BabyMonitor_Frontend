import axios from "axios";
import type { AntwoordDTO } from "../contracts/Course/AntwoordDTO";
import type { AntwoordReponseDTO } from "../contracts/Course/AntwoordResponseDTO";

export class AntwoordService{

    async maakAntwoord(data : AntwoordDTO[]){
        try{
            const response = await axios.post("/api/teacher/antwoord", data);

            if(response.status === 200){
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
            const response =
                await axios.get(`/api/course/${courseID}/antwoorden`);

            if(response.status === 200){
                const responseData : AntwoordReponseDTO[] = response.data;
                return responseData;
            }

            return [];

        } catch(error){

            console.log(error);
            return [];
        }
    }

    validateAntwoord(data: AntwoordDTO[]): string[] {

        const errors: string[] = [];

        data.forEach((item, index) => {

            if (!item.tekst || item.tekst.trim() === "") {

                errors.push(
                    `Antwoord op positie ${index + 1} mist tekst.`
                );
            }
        });

        return errors;
    }
}

export const antwoordService = new AntwoordService();