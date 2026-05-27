import { useState, type SyntheticEvent } from "react";
import { antwoordService } from "../../../Services/AntwoordService";
import { useParams } from "react-router-dom";
import type { AntwoordDTO } from "../../../contracts/Course/AntwoordDTO";


export default function CreateAntwoorden() {

  const id = useParams<{ id: string }>();
  const [antwoordData, setAntwoordData] = useState<AntwoordDTO[]>([{ tekst: "" , courseID: Number(id)}]);
  const [message, setMessage] = useState<string>("");

  const handleChange = (index: number, val: string) => {
    const updated = [...antwoordData];
    updated[index].tekst = val;
    setAntwoordData(updated);
  };

 const handleSubmit = (e: SyntheticEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const errors = antwoordService.validateAntwoord(antwoordData);

    if (errors) {
      setMessage(errors[0]);
    } else {
      saveAntwoord();
    }
  };

  const saveAntwoord = async () => {
    antwoordService.maakAntwoord(antwoordData);
  }

  const voegAntwoordToe = () => {
    setAntwoordData([...antwoordData, { tekst: "", courseID: Number(id) }]);
  };

  const verwijderAntwoord = (index: number) => {
    if (antwoordData.length > 1) {
      setAntwoordData(antwoordData.filter((_, i) => i !== index));
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '400px' }}>
        <h2>Maak nieuwe antwoorden</h2>

        {/* Map through the array to create multiple inputs */}
        {antwoordData.map((antwoord, index) => (
          <div key={index} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <label style={{ flex: 1 }}>
              Antwoord {index + 1}:
              <input
                type="text"
                value={antwoord.tekst}
                onChange={(e) => handleChange(index, e.target.value)}
                placeholder="Typ antwoord hier..."
                style={{ width: '100%', padding: '5px' }}
              />
            </label>
            
            {antwoordData.length > 1 && (
              <button type="button" onClick={() => verwijderAntwoord(index)} style={{ color: 'red' }}>
                ✖
              </button>
            )}
          </div>
        ))}

        <button type="button" onClick={voegAntwoordToe}>
          + Extra antwoord toevoegen
        </button>

        <hr />

        <button type="submit" style={{ padding: '10px', backgroundColor: '#2874a6', color: 'white' }}>
          Sla alle antwoorden op
        </button>
      </form>

      {message && <p className="login-message">{message}</p>}
    </div>
  );
}