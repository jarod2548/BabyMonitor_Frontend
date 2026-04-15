import { useState, type ChangeEvent, type SyntheticEvent } from "react";
import "./Login.css";
import type { LoginDTO } from "../../contracts/Account/LoginDTO";
import { accountService } from "../../Services/AccountService";
import type { LoginResponseDTO } from "../../contracts/Account/LoginResponseDTO";
import { useAuth } from "../../authorization/useAuth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const context = useAuth();
  const navigate = useNavigate();

  const [message, setMessage] = useState<string>("");

  const [loginData, setLoginData] = useState<LoginDTO>({
    username: "",
    password : ""
  })

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setLoginData(prev => ({...prev , username : e.target.value}));
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setLoginData(prev => ({...prev , password : e.target.value}));
  };

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!loginData.username || !loginData.password) {
      setMessage("Please fill in both fields!");
    } else {
      login();
    }
  };

  const login = async () => {
    const user : LoginResponseDTO | null =  await accountService.Login(loginData);
    if(user != null){
      context?.setUser(user);
      console.log("ProtectedRoute user:", context?.user);
      navigate("/home");
    }
};

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            placeholder="Name"
            value={loginData.username}
            onChange={handleNameChange}
            className="pill input-field"
          />
          <input
            type="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handlePasswordChange}
            className="pill input-field"
          />
          <button type="submit" className="apply login-button">Login</button>
        </form>
        {message && <p className="login-message">{message}</p>}
      </div>
    </div>
  );
}