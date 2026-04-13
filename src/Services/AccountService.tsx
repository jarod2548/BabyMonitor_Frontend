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
        
        await axios.post("/api/register", account);
    }

    async authorize() : Promise<LoginResponseDTO | null>{
        try {
            const response = await axios.get("/api/account/auth");
            return response.data;
        } catch (error) {
            console.log(error)
            return null;
        }
        
    }
}

export const accountService = new AccountService();