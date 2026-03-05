import { useState } from "react";
import "./Dashboard_Docent.css";

export default function Dashboard() {
  const [currentHeartRate] = useState(150);
  const [adjustAmount] = useState(20);
  const [timeCost] = useState(20);

  const [delay] = useState(2);
  const [depth] = useState(5);

  const [speed] = useState(1);

  return (
    <div className="container">

      {/* Hartslag */}
      <div className="panel">
        <h2>Huidige Hartslag</h2>

        <div className="pill">{currentHeartRate} bpm</div>

        <p>Pas aan met</p>

        <div className="row">
          <button>-</button>
          <div className="pill">{adjustAmount} bpm</div>
          <button>+</button>
        </div>

        <p>Tijd die het kost</p>

        <div className="row">
          <div className="pill">{timeCost}</div>
          <span>Secondes</span>
        </div>

        <button className="apply">Pas aan</button>
      </div>


      {/* Decleraties */}
      <div className="panel">
        <h2>Decleraties</h2>

        <p>Tijd na wee</p>

        <div className="row">
          <div className="pill">{delay}</div>
          <span>Secondes</span>
        </div>

        <p>Diepte</p>

        <div className="row">
          <div className="pill">{depth}</div>
          <span>bpm</span>
        </div>

        <button className="apply">Pas aan</button>
      </div>


      {/* Snelheid */}
      <div className="panel">
        <h2>Snelheid</h2>

        <div className="row">
          <div className="pill">{speed}</div>
          <span>x</span>
        </div>

        <button className="apply">Pas aan</button>
      </div>

    </div>
  );
}