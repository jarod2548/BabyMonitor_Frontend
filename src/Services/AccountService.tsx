import axios from "axios";
import type { LoginDTO } from "../contracts/Account/LoginDTO";
import type { LoginResponseDTO } from "../contracts/Account/LoginResponseDTO";
import type { RegisterDTO } from "../contracts/Account/RegisterDTO";
import type { Profile, PasswordChangeForm } from "../contracts/Account/Profile";

export class AccountService {

    validateLogin(data: LoginDTO) {
        if (!data.email || !data.password) {
            return "Please fill in both fields!";
        }
        return null;
    }

    async Login(login: LoginDTO): Promise<LoginResponseDTO | null> {
        console.log(login);
        try {
            const response = await axios.post("/api/account/login", login)
            if (response.status === 200) {
                const responseData: LoginResponseDTO = response.data;
                return responseData;
            }
            return null;
        } catch (error) {
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

    async authorize(): Promise<LoginResponseDTO | null> {
        try {
            const response = await axios.get("/api/account/auth");
            const responseData: LoginResponseDTO = response.data;
            return responseData;
        } catch (error) {
            console.log(error)
            return null;
        }
    }

    async fetchProfile(): Promise<Profile | null> {
        try {
            const response = await axios.get("/api/account/me");
            if (response.status === 200) {
                return response.data as Profile;
            }
            return null;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async changePassword(oldPassword: string, newPassword: string): Promise<string> {
        try {
            const response = await axios.patch("/api/account", {
                oldpassword: oldPassword,
                newpassword: newPassword,
            });
            if (response.status === 200) {
                return response.data as string;
            }
            return "Password changed successfully!";
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    validatePasswordChange(form: PasswordChangeForm): string {
        if (form.oldPassword !== form.oldPasswordConfirm) {
            return "Old passwords do not match.";
        }

        if (!form.oldPassword || !form.newPassword) {
            return "All fields are required.";
        }

        if (form.oldPassword === form.newPassword) {
            return "New password must be different from old password.";
        }

        return ""; // Empty string means valid (falsy in if statement)
    }
}

export const accountService = new AccountService();
