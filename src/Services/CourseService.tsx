import axios from "axios";
import type { CourseReponseDTO } from "../contracts/Course/CourseResponseDTO";
import type { CourseDTO } from "../contracts/Course/CourseDTO";

export class CourseService{

    async maakCourse(data : CourseDTO){
        try{
            const response = await axios.post("/api/teacher/course", data);
            if(response.status === 201){
                const responseData : CourseReponseDTO = response.data;
                return responseData;
            }else{
                return null;
            }
        }catch(error){
            console.log(error);
            return null;
        }
    }

    async leesCourses(){
        try{
            const response = await axios.get("/api/user/courses");
            if(response.status === 200){
                const responseData : CourseDTO[] = response.data;
                return responseData;
            }
            return null;
        }
        catch(error){
            console.log(error);
            return null;
        }
    }

    async leesCourse(courseID : number){
        try{
            const response = await axios.get(`/api/user/course${courseID}`);
            if(response.status === 200){
                const responseData : CourseDTO = response.data;
                return responseData;
            }
            return null;
        }
        catch(error){
            console.log(error);
            return null;
        }
    }

    validateCourse(data : CourseDTO){
        if(!data.titel){
            return "titel moet ingevuld zijn";
        }
        return null;
    }
}
export const courseService = new CourseService(); 