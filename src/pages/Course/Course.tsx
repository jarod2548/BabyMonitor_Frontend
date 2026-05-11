import { useNavigate, useParams } from "react-router-dom";
import type { VraagReponseDTO } from "../../contracts/Course/VraagResponseDTO";
import type { AntwoordReponseDTO } from "../../contracts/Course/AntwoordResponseDTO";
import { useEffect, useState } from "react";
import { vraagService } from "../../Services/VraagService";
import ContinuousCTGPlayer from "../../components/ContinousCTGPlayer";
//import { antwoordService } from "../../Services/AntwoordService";
import "./Course.css";

export default function Course() {

  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const [antwoorden, setAntwoorden] =  useState<AntwoordReponseDTO[]>([])
  const [currentVraag, setCurrentVraag] = useState<VraagReponseDTO | null>(null);
  const [page, setPage] = useState(0);
  const [ctgSpeed, setCTGSpeed] = useState(500);


  const chooseAwnser = (id : number) => {
    console.log("chosen:", id);
  };

  useEffect(() => {
    const fetchCourseInformation = async () => {
      const vraagResult = await vraagService.fakeLeesVraag(id, page);
      setCurrentVraag(vraagResult);
    };

    fetchCourseInformation();
}, [id, page]);

useEffect(() => {
  const fetchAntwoorden = async () => {
    try {
      //const antwoordResult = await antwoordService.leesAntwoorden(id);
      setAntwoorden([]);
    } catch (err) {
      console.error("Falen bij het ophalen van antwoorden", err);
    }
  };

  fetchAntwoorden();
}, [id]);


    const handleNext = () => {
    if (1 > page) {
      setPage(prev => prev + 1);
    } else {
      navigate("/course-complete");
    }
  };

if (!currentVraag?.ctgData) {
  return <div>Loading...</div>;
}
  
  return (
    <div className="question-page">

    <div className="progress-bar">
      Vraag {page + 1}
    </div>

    {/* TOP SECTION (LOCKED) */}
    <div className="top-section">

      <h3 className="question-text">
        {currentVraag?.tekst}
      </h3>

      <div className="ctg-container">
        <ContinuousCTGPlayer
          ctgData={currentVraag.ctgData}
          speed={ctgSpeed}
  />
      </div>

    </div>

    {/* MIDDLE */}
    <div className="answers-container">
      {antwoorden.map((a) => (
        <button
          key={a.antwoordID}
          onClick={() => chooseAwnser(a.antwoordID)}
        >
          {a.tekst}
        </button>
      ))}
    </div>

    

    {/* BOTTOM */}
    <div className="nav-container">

      <div className="speed-control">
        <label>CTG Speed (ms):</label>

        <input
        type="number"
        value={ctgSpeed}
        onChange={(e) => setCTGSpeed(Number(e.target.value))}
        min={100}
        step={50}
        />

        <button onClick={() => setCTGSpeed(ctgSpeed)}>
          Set Speed
        </button>
      </div>

      <button onClick={handleNext}>
        Volgende Vraag
      </button>
    </div>

  </div>
  );
}