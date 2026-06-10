import axios from "axios";
import type { VraagDTO } from "../contracts/Course/VraagDTO";
import type { VraagReponseDTO } from "../contracts/Course/VraagResponseDTO";
import type { VraagAntwoordDTO } from "../contracts/Course/VraagAntwoordDTO";
import type { AntwoordMetStatusDTO } from "../contracts/Course/AntwoordMetStatusDTO";
//import type { ctgData } from "../contracts/ctgData";

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

   async leesVraagCourse(courseID : number, pageID : number){
       try{
           const response = await axios.get(`/api/user/vraagCourse/${courseID}/${pageID}`);
           if(response.status === 200){
               const responseData : VraagReponseDTO = response.data;
               return responseData;
           }
           return null;
       }
       catch(error){
           console.log(error);
           return null;
       }
   }
   async leesVraag(vraagID : number){
       try{
           const response = await axios.get(`/api/user/vraag/${vraagID}`);
           if(response.status === 200){
               const responseData : VraagReponseDTO = response.data;
               return responseData;
           }
           return null;
       }
       catch(error){
           console.log(error);
           return null;
       }
   }

   async leesVragen(courseID : number){
    try{
        const response = await axios.get(`/api/user/vragen/${courseID}`);
        if(response.status === 200){
            const responseData : VraagReponseDTO[] = response.data;
            return responseData;
        }
        return [];
    }
    catch(error){
        console.log(error);
        return [];
    }
   }

    async linkAntwoordToVraag(vraagAntwoord : VraagAntwoordDTO){
        try{
            const response = await axios.post(`/api/teacher/vraag-antwoord`, vraagAntwoord);
            if(response.status === 201){
             const responseData = response.data;
             return responseData;   
            }
        }
        catch(error){
            console.log(error);
        }
    }

    async leesGekoppeldeAntwoorden(vraagID : number, courseID : number){
        try{
            const response = await axios.get(`/api/teacher/vraag-antwoord/${courseID}/${vraagID}`);
            if(response.status === 200){
                const responseData : AntwoordMetStatusDTO[] = response.data;
                return responseData;
            }
            return [];
        }catch(err){
            console.log(err);
            return [];
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