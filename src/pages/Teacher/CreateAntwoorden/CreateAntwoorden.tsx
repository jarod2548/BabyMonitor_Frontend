import { useEffect, useState, type SyntheticEvent } from "react";
import { antwoordService } from "../../../Services/AntwoordService";
import { useParams } from "react-router-dom";
import type { AntwoordDTO } from "../../../contracts/Course/AntwoordDTO";
import type { AntwoordReponseDTO } from "../../../contracts/Course/AntwoordResponseDTO";

export default function CreateAntwoorden() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);

  const [antwoordData, setAntwoordData] = useState<AntwoordDTO>({
    tekst: "",
    courseID: id,
  });

  const [antwoorden, setAntwoorden] = useState<AntwoordReponseDTO[]>([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const fetchAntwoorden = async () => {
      const resultaten = await antwoordService.leesAntwoorden(id);
      setAntwoorden(resultaten);
    };

    fetchAntwoorden();
  }, [id]);

  const handleChange = (val: string) => {
    setAntwoordData({
      ...antwoordData,
      tekst: val,
    });
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
    await antwoordService.maakAntwoord(antwoordData);

    setAntwoordData({
      tekst: "",
      courseID: id,
    });

    const resultaten = await antwoordService.leesAntwoorden(id);
    setAntwoorden(resultaten);

    setMessage("");
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          maxWidth: "400px",
        }}
      >
        <h2>Maak nieuw antwoord</h2>

        <label>
          Antwoord:
          <input
            type="text"
            value={antwoordData.tekst}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Typ antwoord hier..."
            style={{ width: "100%", padding: "5px" }}
          />
        </label>

        <h3>Bestaande antwoorden</h3>

        {antwoorden.length === 0 ? (
          <p>Geen antwoorden gevonden.</p>
        ) : (
          <ul>
            {antwoorden.map((antwoord) => (
              <li key={antwoord.antwoordID}>
                {antwoord.tekst}
              </li>
            ))}
          </ul>
        )}

        <hr />

        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#2874a6",
            color: "white",
          }}
        >
          Antwoord opslaan
        </button>
      </form>

      {message && <p className="login-message">{message}</p>}
    </div>
  );
}