import axios from "axios";
import type { LoginDTO } from "../contracts/Account/LoginDTO";
import type { LoginResponseDTO } from "../contracts/Account/LoginResponseDTO";

export class AccountService{
    async Login(login : LoginDTO): Promise<boolean>{
        console.log(login);
        try{
            const response = await axios.post("/api/account/login", login)
            if(response.status === 200){
                return true;
            }
            return false;
        }catch(error){
            console.log(error);
            return false;
        }
        
    }

    async Registratie(account : LoginDTO){
        
        const response : LoginResponseDTO = await axios.post("/api/register", account);
        localStorage.setItem("name", response.username);
        localStorage.setItem("role", response.role);
    }

    async authorize() : Promise<boolean>{
        try {
            const response : LoginResponseDTO = await axios.get("/api/account/auth");
            localStorage.setItem("name", response.username);
            localStorage.setItem("role", response.role);
            return true;
        } catch (error) {
            console.log(error)
            localStorage.removeItem("name");
            localStorage.removeItem("role");
            return false;
        }
        
    }
}

export const accountService = new AccountService();