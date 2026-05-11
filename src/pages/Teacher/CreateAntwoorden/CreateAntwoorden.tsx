import { useState, type SyntheticEvent } from "react";
import type { AntwoordDTO } from "../../../contracts/Course/AntwoordDTO";
import { antwoordService } from "../../../Services/AntwoordService";


export default function CreateAntwoorden() {
  const [antwoordData, setVraagData] = useState<AntwoordDTO>({
    tekst : "",
  });
  const [message, setMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVraagData((prev) => ({
      ...prev,
    tekst : e.target.value
    }));
  };

 const handleSubmit = (e: SyntheticEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const error = antwoordService.validateAntwoord(antwoordData);

    if (error) {
      setMessage(error);
    } else {
      saveAntwoord();
    }
  };

  const saveAntwoord = async () => {
    antwoordService.maakAntwoord(antwoordData);
  }

  return (
    <div>
       <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
      <h2>Maak een nieuwe antwoord</h2>
      
      <label>
        Tekst:
        <input 
          type="text" 
          name="titel" 
          value={antwoordData.tekst} 
          onChange={handleChange} 
          required 
        />
      </label>

      <button type="submit">Sla antwoord op</button>
    </form>
     {message && <p className="login-message">{message}</p>} 
    </div>
   
    
  );
}