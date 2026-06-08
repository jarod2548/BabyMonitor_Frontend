import { useNavigate } from "react-router-dom";
import "./Home_Docent.css";
import "./App.css";

interface HomeDocentProps {
  embedded?: boolean;
}

function Home_Docent({ embedded = false }: HomeDocentProps) {
  const navigate = useNavigate();

  const content = (
    <div className="start-container">

      <h1 className="title">Welcome</h1>
      <p className="subtitle">
        Select how you want to continue
      </p>

      <div className="card-grid">

        {/* Teacher entry */}
        <div className="start-card teacher">
          <h2>Teacher</h2>
          <p>
            Create lessons, control simulations and manage groups.
          </p>

          <button onClick={() => navigate("/teacher")}>
            Enter Teacher Dashboard
          </button>
        </div>

        {/* Student entry */}
        <div className="start-card student">
          <h2>Student</h2>
          <p>
            Join your assigned session and follow along.
          </p>

          <button onClick={() => navigate("/student")}>
            Enter Student View
          </button>
        </div>

      </div>

    </div>
  );

  if (embedded) {
    return <div className="Home_Docent embedded">{content}</div>;
  }

  return (
    <div className="Home_Docent start-dashboard">
      {content}
    </div>
  );
}

export default Home_Docent;