import { useEffect, useState, type SyntheticEvent } from "react";
import type { VraagDTO } from "../../../contracts/Course/VraagDTO";
import { vraagService } from "../../../Services/VraagService";
import { useParams } from "react-router-dom";
import type { VraagReponseDTO } from "../../../contracts/Course/VraagResponseDTO";
import type { ctgData } from "../../../contracts/ctgData";
import CtgDataForm from "../CtgDataForm";

export default function CreateVragen() {
    const params = useParams<{ id: string }>();
  const id = Number(params.id);
    
  const [vraagData, setVraagData] = useState<VraagDTO>({
  tekst: "",
  courseID: Number(id),
  ctgData: {
    hartbasis: 0,
    variabiliteit: 0,
  },
});
  const handleCtgChange = (data: ctgData) => {
  setVraagData((prev) => ({
    ...prev,
    ctgData: data,
  }));
};

  const [vragen, setVragen] = useState<VraagReponseDTO[]>([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const fetchVragen = async() => {
      const data : VraagReponseDTO[] = await vraagService.leesVragen(Number(id));
      setVragen(data);
    };
    fetchVragen();
  }, [id])

 const handleSubmit = (e: SyntheticEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const error = vraagService.validateVraag(vraagData);

    if (error) {
      setMessage(error);
    } else {
      saveVraag();
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setVraagData((prev) => ({
      ...prev,
      tekst: value,
    }));
  };

  const saveVraag = async () => {
    vraagService.maakVraag(vraagData);
  }
  
return (
    <div>
      <div style={{ marginTop: "20px" }}>
        <h3>Vragen</h3>

        {vragen.map((v) => (
          <div
            key={v.vraagID}
            style={{
              padding: "8px",
              marginBottom: "6px",
              background: "#1a1a1a",
              color: "white",
              borderLeft: "3px solid #00ff88",
            }}
          >
            {v.tekst}
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "300px",
        }}
      >
        <h2>Maak een nieuwe vraag</h2>

        <label>
          Tekst:
          <input
            type="text"
            value={vraagData.tekst}
            onChange={handleTextChange}
            required
          />
        </label>

        {/* CTG FIELDS */}
        <CtgDataForm
          value={vraagData.ctgData}
          onChange={handleCtgChange}
        />

        <button type="submit">Sla de vraag op</button>
      </form>

      {message && <p className="login-message">{message}</p>}
    </div>
  );
}