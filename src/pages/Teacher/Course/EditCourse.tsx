import { useParams } from "react-router-dom";
import CreateVragen from "../CreateVragen/CreateVragen";
import CreateAntwoorden from "../CreateAntwoorden/CreateAntwoorden";

export default function EditCourse() {
  const params = useParams<{ id: string }>();
  const courseID = Number(params.id);

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "30px",
      }}
    >
      <h1>Course bewerken</h1>

      <div
        style={{
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      >
        <CreateVragen key={`vragen-${courseID}`} />
      </div>

      <div
        style={{
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      >
        <CreateAntwoorden key={`antwoorden-${courseID}`} />
      </div>
    </div>
  );
}