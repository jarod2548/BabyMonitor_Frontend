import axios from "axios";
import type { LoginDTO } from "../contracts/LoginDTO";

export class AccountService{
    async Login(login : LoginDTO){
        console.log(login);
        try{
            const response = await axios.post("/api/account/login", login)
            console.log(response.data);
            console.log(response.status);
        }catch(error){
            console.log(error);
        }
        
    }

    async Registratie(account : LoginDTO){
        
        await axios.post("/api/register", account);
    }

    async authorize() : Promise<boolean>{
        try {
            const response = await axios.get("/api/account/auth")
        if(response.status === 200){
            return true;
        }else{
            return false;
        }
        } catch (error) {
            console.log(error)
            return false;
        }
        
    }
}

export const accountService = new AccountService();