  import { useEffect, useState } from "react";

  import { AuthContext } from "./authContext";
  import type { LoginResponseDTO } from "../contracts/Account/LoginResponseDTO";
  import { accountService } from "../Services/AccountService";

  export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<LoginResponseDTO | null>(null);

    useEffect(() => {
      accountService.authorize().then(setUser);
    }, []);

    return (
      <AuthContext.Provider value={{user, setUser}}>
        {children}
      </AuthContext.Provider>
    );
  }