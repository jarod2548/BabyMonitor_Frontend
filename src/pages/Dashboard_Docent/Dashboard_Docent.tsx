import { useState } from "react";
import "./Dashboard_Docent.css";
import { HeartbeatSimulation } from "../../Services/HeartbeatAdjustTest";
import type { AcceleratieType } from "../../Enums/AcceleratieType";
import type { HeartbeatData } from "../../contracts/HeartbeatData";
import type { WeeData } from "../../contracts/WeeData";
import CtgChart from "../../components/CtgChart/CtgChart";

export default function Dashboard() {
    const [heartbeat, setHeartbeat] = useState<HeartbeatData>({
    aanpassingAantal: 20,
    tijdDuratie: 20,
    isPositief: true
  });

  const [huidigehartslag, setHuidigeHartslag] = useState(110);

  const [weeData, setWeeData] = useState<WeeData>({
    weeDuratie : 2,
    weeSterkte : 2,
    acceleratieType : "Vroeg"
  });
  

  const [speed] = useState(1);

  const IncreaseHeartbeat = () : void => {
    setHeartbeat(prev => ({
      ...prev,
      isPositief: true
    }));
  }
  const DecreaseHeartbeat = () : void => {
    setHeartbeat(prev => ({
      ...prev,
      isPositief: false
    }));
  }

  const EditHeartbeat = () : void => {
    const amount : number = heartbeat.isPositief ? heartbeat.aanpassingAantal : -heartbeat.aanpassingAantal;
      HeartbeatSimulation(amount,heartbeat.tijdDuratie, setHuidigeHartslag);
  }
  const setAanpassingAantal = (e: React.ChangeEvent<HTMLInputElement>) => {
  setHeartbeat(prev => ({
    ...prev,
    aanpassingAantal: (Number(e.target.value))
  }));
};

const setTijdDuratie = (e: React.ChangeEvent<HTMLInputElement>) => {
  setHeartbeat(prev => ({
    ...prev,
    tijdDuratie: (Number(e.target.value))
  }));
};
const ChangeWeeDuratie = (e : React.ChangeEvent<HTMLInputElement>) => {
    setWeeData(prev => ({
      ...prev,
      weeDuratie: (Number(e.target.value))
    }));
  }

  const ChangeWeeSterkte = (e : React.ChangeEvent<HTMLInputElement>) => {
    setWeeData(prev => ({
      ...prev,
      weeSterkte: (Number(e.target.value))
    }));
  }

  const ChangeWeeType = (e : React.ChangeEvent<HTMLSelectElement>) => {
    setWeeData(prev => ({
      ...prev,
      acceleratieType: e.target.value as AcceleratieType
    }));
  }



  

  return (
    <div className="container">

      <div className="CTGGrafiek">
        <h2>CTG Grafiek</h2>
        <CtgChart />
      </div>

      <div className="panels">
        {/* Hartslag */}
      <div className="panel">
        <h2>Huidige Hartslag</h2>

        <div className="pill">{huidigehartslag} bpm</div>

        <p>Pas aan met</p>

        <div className="row">
          <button onClick={DecreaseHeartbeat}
                  className={heartbeat.isPositief ? "button" : "button glow"}>-</button>

          <div className="row">
            <input
              type = "number"
              value = {heartbeat.aanpassingAantal}
              onChange={setAanpassingAantal}
              className="pill"/>
            {heartbeat.aanpassingAantal} bpm
            </div>

          <button onClick={IncreaseHeartbeat}
                  className={heartbeat.isPositief ? "button glow" : "button"}>+</button>
        </div>

        <p>Aanpassen over</p>

        <div className="row">
          <input
           type = "number"
           value={heartbeat.tijdDuratie}
           onChange={setTijdDuratie}
           className="pill" />
          <span>Secondes</span>
        </div>

        <button onClick={EditHeartbeat} className="apply">Pas aan</button>
      </div>


      {/* Decleraties */}
      <div className="panel">
        <h2>Acceleraties/Decceleraties</h2>

        <p>Duratie van wee</p>

        <div className="row">
          <input
           type = "number"
           value={weeData.weeDuratie}
           onChange={ChangeWeeDuratie}
           className="pill" />
          <span>Secondes</span>
        </div>

        <p>Sterkte van wee</p>

        <div className="row">
          <input
           type = "number"
           value={weeData.weeSterkte}
           onChange={ChangeWeeSterkte}
           className="pill" />
          <span>%</span>
        </div>

        <p>Type</p>
      <div className="row">
        <select
           value={weeData.acceleratieType}
           onChange={ChangeWeeType}
           className="pill">
            <option value="Vroeg">Vroeg</option>
            <option value="Deacceleratie">Decceleratie</option>
            <option value="Laat">Laat</option>
            <option value="Variable">Variable</option>
           </select>
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

      

    </div>
  );
}