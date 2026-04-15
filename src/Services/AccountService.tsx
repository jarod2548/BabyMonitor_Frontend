import axios from "axios";
import type { LoginDTO } from "../contracts/Account/LoginDTO";
import type { LoginResponseDTO } from "../contracts/Account/LoginResponseDTO";
;

export class AccountService{

    async Login(login : LoginDTO): Promise<LoginResponseDTO | null>{
        console.log(login);
        try{
            const response = await axios.post("/api/account/login", login)
            if(response.status === 200){
                const responseData : LoginResponseDTO = response.data;
                return responseData;
            }
            return null;
        }catch(error){
            console.log(error);
            return null;
        }
        
    }

    async Registratie(account : LoginDTO){
        
        const response : LoginResponseDTO = await axios.post("/api/acccount", account);
        localStorage.setItem("name", response.username);
        localStorage.setItem("role", response.role);
    }

    async authorize() : Promise<LoginResponseDTO | null> {
        try {
            const response = await axios.get("/api/account/auth");
            const responseData : LoginResponseDTO = response.data;
            return responseData;
        } catch (error) {
            console.log(error)
            return null;
        }   
    }
}

export const accountService = new AccountService();