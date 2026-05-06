import { useState, type SyntheticEvent } from "react";
import type { VraagDTO } from "../../../contracts/Course/VraagDTO";
import { vraagService } from "../../../Services/VraagService";

export default function CreateVragen() {
  const [vraagData, setVraagData] = useState<VraagDTO>({
    tekst : "",
    courseID: 0,
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

    const error = vraagService.validateVraag(vraagData);

    if (error) {
      setMessage(error);
    } else {
      saveVraag();
    }
  };

  const saveVraag = async () => {
    vraagService.maakVraag(vraagData);
  }

  return (
    <div>
       <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
      <h2>Maak een nieuwe vraag</h2>
      
      <label>
        Tekst:
        <input 
          type="text" 
          name="titel" 
          value={vraagData.tekst} 
          onChange={handleChange} 
          required 
        />
      </label>

      <button type="submit">Sla de vraag op</button>
    </form>
     {message && <p className="login-message">{message}</p>} 
    </div>
   
    
  );
}