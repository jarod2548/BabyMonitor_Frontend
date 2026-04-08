import { useState, useEffect } from "react";
import { accountService } from "../../Services/AccountService";


export function useAuth() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
        const response = await accountService.authorize();
      setLoggedIn(response);
    };
    checkAuth();
  }, []);

  return loggedIn;
}