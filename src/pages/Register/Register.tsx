import { useState, type ChangeEvent, type SyntheticEvent } from "react";
import "./Register.css";
import { accountService } from "../../Services/AccountService";
import { useAuth } from "../../authorization/useAuth";
import { useNavigate } from "react-router-dom";
import type { RegisterDTO } from "../../contracts/Account/RegisterDTO";
import type { LoginResponseDTO } from "../../contracts/Account/LoginResponseDTO";

export default function Register() {
  const context = useAuth();
  const navigate = useNavigate();

  const [message, setMessage] = useState<string>("");

  const [registerData, setRegisterData] = useState<RegisterDTO>({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!registerData.username || !registerData.email || !registerData.password) {
      setMessage("Vul alle velden in!");
    } else{
    register();
    }
  };

  const register = async () => {
    const user: LoginResponseDTO | null = await accountService.Registratie(registerData);

    if (user != null) {
      context?.setUser(user);
      navigate("/home");
    } else {
      setMessage("Registratie mislukt.");
    }
  };

return (
  <div className="register-page">
    <div className="register-container">
      <h2 className="register-title">Registreren</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="text"
          name="username"
          placeholder="Gebruikersnaam"
          value={registerData.username}
          onChange={handleChange}
          className="register-input"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={registerData.email}
          onChange={handleChange}
          className="register-input"
        />

        <input
          type="password"
          name="password"
          placeholder="Wachtwoord"
          value={registerData.password}
          onChange={handleChange}
          className="register-input"
        />

        <button type="submit" className="register-button">
          Registreren
        </button>
      </form>

      {message && <p className="register-message">{message}</p>}
    </div>
  </div>
);
}