import { createContext } from "react";
import type { LoginResponseDTO } from "../contracts/Account/LoginResponseDTO";

type AuthContextType = {
  user: LoginResponseDTO | null;
  setUser: (user: LoginResponseDTO | null) => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);