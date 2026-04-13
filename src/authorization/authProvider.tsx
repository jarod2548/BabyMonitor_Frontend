  import { useState } from "react";

  import { AuthContext } from "./authContext";
  import type { LoginResponseDTO } from "../contracts/Account/LoginResponseDTO";

  function getInitialUser(): LoginResponseDTO | null {
  const stored = localStorage.getItem("user");
  return stored ? JSON.parse(stored) : null;
}

  export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<LoginResponseDTO | null>(getInitialUser);

  const setUser = (u: LoginResponseDTO | null) => {
    setUserState(u);

    if (u) {
      localStorage.setItem("user", JSON.stringify(u));
    } else {
      localStorage.removeItem("user");
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}