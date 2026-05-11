import axios from "axios";
import type { VraagDTO } from "../contracts/Course/VraagDTO";
import type { VraagReponseDTO } from "../contracts/Course/VraagResponseDTO";
import type { ctgData } from "../contracts/ctgData";

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

   //async leesVraag(courseID : number, pageID : number){
   //    try{
   //        const response = await axios.get(`/api/user/vraag/${courseID}/${pageID}`);
   //        if(response.status === 200){
   //            const responseData : VraagReponseDTO = response.data;
   //            return responseData;
   //        }
   //        return null;
   //    }
   //    catch(error){
   //        console.log(error);
   //        return null;
   //    }
   //}

    async fakeLeesVraag(courseID : number, pageID : number){
        const ctgData : ctgData = {hartBasis : 100, variabiliteit : 10, minuten : 10};
        const response : VraagReponseDTO = {courseID : courseID, tekst : "Course 1", vraagID : pageID, ctgData };
        return response;
    }

    validateVraag(data : VraagDTO){
        if(!data.tekst){
            return "tekst moet ingevuld zijn";
        }
        return null;
    }
}
export const vraagService = new VraagService(); 