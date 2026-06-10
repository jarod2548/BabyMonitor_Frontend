import { useEffect, useState, type SyntheticEvent } from "react";
import type { VraagDTO } from "../../../contracts/Course/VraagDTO";
import { vraagService } from "../../../Services/VraagService";
import { useNavigate, useParams } from "react-router-dom";
import type { VraagReponseDTO } from "../../../contracts/Course/VraagResponseDTO";
import type { ctgData } from "../../../contracts/ctgData";
import CtgDataForm from "../CtgDataForm";

export default function CreateVragen() {
    const params = useParams<{ id: string }>();
  const courseID = Number(params.id);
  const navigate = useNavigate();
    
  const [vraagData, setVraagData] = useState<VraagDTO>({
  tekst: "",
  courseID: Number(courseID),
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
      const data : VraagReponseDTO[] = await vraagService.leesVragen(Number(courseID));
      setVragen(data);
    };
    fetchVragen();
  }, [courseID])

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
    await vraagService.maakVraag(vraagData);

    const data = await vraagService.leesVragen(courseID);
    setVragen(data);

    setVraagData({
      tekst: "",
      courseID,
      ctgData: {
        hartbasis: 0,
        variabiliteit: 0,
      },
    });

  setMessage("");
};
  
return (
    <div>
      <div style={{ marginTop: "20px" }}>
        <h3>Vragen</h3>

        {vragen.map((v) => (
          <button
            key={v.id}
            onClick={() => navigate(`/edit_vraag/${courseID}/${v.id}`)}
            style={{
              padding: "8px",
              marginBottom: "6px",
              background: "#1a1a1a",
              color: "white",
              borderLeft: "3px solid #00ff88",
            }}
          >
            {v.tekst}
          </button>
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