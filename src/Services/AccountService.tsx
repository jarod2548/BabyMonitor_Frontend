import axios from "axios";
import type { LoginDTO } from "../contracts/Account/LoginDTO";
import type { LoginResponseDTO } from "../contracts/Account/LoginResponseDTO";
import type { RegisterDTO } from "../contracts/Account/RegisterDTO";
;

export class AccountService{

    validateLogin(data : LoginDTO){
        console.log(data);
        return null
        }

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

    async Registratie(account: RegisterDTO): Promise<LoginResponseDTO | null> {
        try {
          const response = await axios.post("/api/account/register", account);

          if (response.status === 200 || response.status === 201) {
            const responseData: LoginResponseDTO = response.data;
            return responseData;
          }

          return null;
        } catch (error) {
          console.log(error);
          return null;
        }
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