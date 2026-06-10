import { useEffect, useMemo, useState } from "react";
import "./ClassDocent.css";
import type { CtgPoint } from "../../contracts/ctgpoint";
import CtgChart from "../../components/CtgChart/CtgChart";
import { useLocation, useParams } from "react-router-dom";
import { groupService } from "../../Services/GroupService";
import { wsService } from "../../WebSocketService";
import type { WeeData } from "../../contracts/WeeData";
import type { AcceleratieType } from "../../Enums/AcceleratieType";
import type { HeartbeatData } from "../../contracts/HeartbeatData";

export default function Class_Docent() {
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const [currentCtgData, setCurrentCtgData] = useState<CtgPoint>(); 

const [heartbeatData, setHeartbeatData] = useState<HeartbeatData>({
  aantal: 140,
  tijdDuratie: 30,
  varibiliteit : 10
});

  const [weeData, setWeeData] = useState<WeeData>({
  weeDuratie: 60,
  weeSterkte: 80,
  acceleratieType: "VROEG",
});

  const [points, setPoints] = useState<CtgPoint[]>(
  Array.from({ length: 240 }, (_, i) => ({
    x: i,
    timestamp: i,
    fhrBpm: 140,
    wee: 0,
  }))
);

  useEffect(() => {
    if (!id) return;

    const topic = `/topic/group/${id}/ctg`;

    wsService.connect().then(() => {
      wsService.subscribe<CtgPoint>(topic, (point) => {
        setCurrentCtgData(point);
        setPoints((prev) => {
          const updated = [...prev, point];
          return updated.slice(-240);
        });
      });
    });

    return () => {
      wsService.unsubscribe(topic);
    };
  }, [id]);

 const sendHeartbeat = (
  destination: string,
  payload?: HeartbeatData
) => {
  if (!id) return;

  wsService.sendHeartbeat(
    `/app/group/${id}/${destination}`,
    payload
  );
};
  const sendContraction = (destination : string, payload?: WeeData) => {
    if (!id) return;

    wsService.sendWee(
      `/app/group/${id}/${destination}`,
      payload
    );
  };


  const updateBaseline = () => {
    sendHeartbeat(
    "hartslag",
    heartbeatData
    );
  };

const triggerContraction = () => {
  sendContraction("contraction", weeData);
};

  const chartData = useMemo(() => {
  return points.map((p, index) => ({
    ...p,        
    x: index,    
  }));
}, [points]);

  useEffect(() => {
    const handleUnload = () => {
      const role = localStorage.getItem("role");
      if (role === "teacher") {
        groupService.leaveGroupOnUnload();
      }
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  useEffect(() => {
    return () => {
      const role = localStorage.getItem("role");
      if (role === "teacher") {
        groupService.leaveGroupOnUnload();
      }
    };
  }, [location]);

  return (
    <div className="container">

      {/* CTG */}
      <div className="CTGGrafiek">
        <h2>CTG Grafiek</h2>
        <CtgChart data={chartData} />
      </div>

      {/* TEACHER CONTROLS */}
      <div className="panels">

        <div className="panel">
    <h2>Heart Rate Control</h2>

    
    <div>
  <label>Nieuwe hartslag</label>
  <input
    type="number"
    value={heartbeatData.aantal}
    onChange={(e) =>
      setHeartbeatData({
        ...heartbeatData,
        aantal: Number(e.target.value),
      })
    }
  />
</div>

<div>
  <label>Duur overgang (seconden)</label>
  <input
    type="number"
    min={1}
    max={300}
    value={heartbeatData.tijdDuratie}
    onChange={(e) =>
      setHeartbeatData({
        ...heartbeatData,
        tijdDuratie: Number(e.target.value),
      })
    }
  />
</div>

<div>
  <label>Varibiliteit</label>
  <input
    type="number"
    min={1}
    max={50}
    value={heartbeatData.varibiliteit}
    onChange={(e) =>
      setHeartbeatData({
        ...heartbeatData,
        varibiliteit: Number(e.target.value),
      })
    }
  />
</div>

<button onClick={updateBaseline}>
  Bevestig nieuwe gemiddelde hartslag
</button>
    
</div>

        <div className="panel">
  <h2>Uterine Activity</h2>

  <div>
    <label>Duur (seconden)</label>
    <input
      type="number"
      min={10}
      max={180}
      value={weeData.weeDuratie}
      onChange={(e) =>
        setWeeData({
          ...weeData,
          weeDuratie: Number(e.target.value),
        })
      }
    />
  </div>

  <div>
    <label>Sterkte</label>
    <input
      type="number"
      min={0}
      max={100}
      value={weeData.weeSterkte}
      onChange={(e) =>
        setWeeData({
          ...weeData,
          weeSterkte: Number(e.target.value),
        })
      }
    />
  </div>

  <div>
    <label>Type</label>
    <select
      value={weeData.acceleratieType}
      onChange={(e) =>
        setWeeData({
          ...weeData,
          acceleratieType: e.target.value as AcceleratieType,
        })
      }
    >
      <option value="VROEG">Vroeg</option>
      <option value="LAAT">Laat</option>
      <option value="VARIABLE">Variable</option>
      <option value="DEACCELERATIE">Deacceleratie</option>
    </select>
  </div>

  <button onClick={triggerContraction}>
    Start wee
  </button>
</div>

        <div className="panel">
          <h2>Status</h2>
          <div className="pill">
            HuidigeHartslag: {currentCtgData?.fhrBpm}
          </div>
        </div>

      </div>
    </div>
  );
}