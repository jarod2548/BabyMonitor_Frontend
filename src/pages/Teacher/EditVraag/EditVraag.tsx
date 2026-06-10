import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { vraagService } from "../../../Services/VraagService";

import type { VraagReponseDTO } from "../../../contracts/Course/VraagResponseDTO";
import type { VraagAntwoordDTO } from "../../../contracts/Course/VraagAntwoordDTO";
import type { AntwoordMetStatusDTO } from "../../../contracts/Course/AntwoordMetStatusDTO";

export default function EditVraag() {
  const { courseId, vraagId } = useParams();

  const [vraag, setVraag] = useState<VraagReponseDTO | null>(null);
  const [tekst, setTekst] = useState("");

  const [antwoorden, setAntwoorden] = useState<AntwoordMetStatusDTO[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!courseId || !vraagId) return;


      const gevondenVraag = await vraagService.leesVraag(Number(vraagId));

      setVraag(gevondenVraag);

      if (gevondenVraag) {
        setTekst(gevondenVraag.tekst);
      }

      const resultaten = await vraagService.leesGekoppeldeAntwoorden(Number(vraagId), Number(courseId));

      setAntwoorden(resultaten);

    };

    fetchData();
  }, [courseId, vraagId]);

  const linkAntwoordToVraag = async (antwoordId :number) => {
    if(!vraag) return;
    const dto:VraagAntwoordDTO = {
        vraagId:vraag.id,
        antwoordId:antwoordId
    }
       const result = await vraagService.linkAntwoordToVraag(dto);

       if (result) {
    setAntwoorden((prev) =>
      prev.map((a) =>
        a.antwoordId === antwoordId
          ? { ...a, gekoppeld: true }
          : a
      )
    );
  }
  }

  if (!vraag) {
    return <p>Vraag niet gevonden.</p>;
  }

  return (
    <div>
      <h2>Vraag bewerken</h2>

      <label>
        Vraagtekst
        <input
          type="text"
          value={tekst}
        />
      </label>

      <br />
      <br />

      <hr />

      <h3>Beschikbare antwoorden</h3>

      {antwoorden.length === 0 ? (
        <p>Geen antwoorden gevonden.</p>
      ) : (
        <ul>
          {antwoorden.map((antwoord) => (
              <li
                key={antwoord.antwoordId}
                onClick={
                  antwoord.gekoppeld
                    ? undefined
                    : () => {console.log("antwoordID:", antwoord.antwoordId);
                            linkAntwoordToVraag(antwoord.antwoordId);}
                }
                style={{
                  border: antwoord.gekoppeld
                    ? "2px solid green"
                    : "1px solid #ccc",
                  cursor: antwoord.gekoppeld
                    ? "default"
                    : "pointer",
                  padding: "8px",
                  marginBottom: "6px",
                }}
              >
                {antwoord.tekst}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}