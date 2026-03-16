import { useState } from "react";
import "./Dashboard_Docent.css";
import { HeartbeatSimulation } from "../../Services/HeartbeatAdjustTest";

export default function Dashboard() {
  const [currentHeartRate, setHeartRate] = useState(150);
  const [adjustAmount, setAdjustAmount] = useState(20);
  const [timeCost, setTimeCost] = useState(20);

  const [increaseDecrease, setIncreaseDecrease] = useState<boolean>(true);

  const [delay] = useState(2);
  const [depth] = useState(5);

  const [speed] = useState(1);

  const IncreaseHeartbeat = () : void => {
    setIncreaseDecrease(true);
  }
  const DecreaseHeartbeat = () : void => {
    setIncreaseDecrease(false);
  }

  const EditHeartbeat = () : void => {
    const amount : number = increaseDecrease ? adjustAmount : -adjustAmount;
      HeartbeatSimulation(amount,timeCost, setHeartRate);
      setAdjustAmount(20);
      setTimeCost(20);
  }

  const EditHeartbeatTimeNeeded = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeCost(Number(e.target.value));
  }

  const ChangeAdjustValue = (e : React.ChangeEvent<HTMLInputElement>) => {
    setAdjustAmount(Number(e.target.value));
  }

  return (
    <div className="container">

      {/* Hartslag */}
      <div className="panel">
        <h2>Huidige Hartslag</h2>

        <div className="pill">{currentHeartRate} bpm</div>

        <p>Pas aan met</p>

        <div className="row">
          <button onClick={DecreaseHeartbeat}
                  className={increaseDecrease ? "button" : "button glow"}>-</button>

          <div className="row">
            <input
              type = "number"
              value = {adjustAmount}
              onChange={ChangeAdjustValue}
              className="pill"/>
            {adjustAmount} bpm
            </div>

          <button onClick={IncreaseHeartbeat}
                  className={increaseDecrease ? "button glow" : "button"}>+</button>
        </div>

        <p>Tijd die het kost</p>

        <div className="row">
          <input
           type = "number"
           value={timeCost}
           onChange={EditHeartbeatTimeNeeded}
           className="pill" />
          <span>Secondes</span>
        </div>

        <button onClick={EditHeartbeat} className="apply">Pas aan</button>
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