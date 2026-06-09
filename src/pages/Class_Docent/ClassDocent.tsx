import { useEffect, useMemo, useState } from "react";
import "./ClassDocent.css";
import type { CtgPoint } from "../../contracts/ctgpoint";
import CtgChart from "../../components/CtgChart/CtgChart";
import { useLocation, useParams } from "react-router-dom";
import { groupService } from "../../Services/GroupService";
import type { CtgCommand } from "../../contracts/ctgCommand";
import { wsService } from "../../WebSocketService";

export default function Class_Docent() {
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const [baselineInput, setBaselineInput] = useState(140);
  const [variabilityInput, setVariabilityInput] = useState(10);

  const [points, setPoints] = useState<CtgPoint[]>(
  Array.from({ length: 240 }, (_, i) => ({
    x: i,
    timestamp: i,
    fhrBpm: 140,
    toco: 0,
  }))
);

  useEffect(() => {
    if (!id) return;

    const topic = `/topic/group/${id}/ctg`;

    wsService.connect().then(() => {
      wsService.subscribe<CtgPoint>(topic, (point) => {
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

  const sendCommand = (destination : string, payload?: CtgCommand) => {
    if (!id) return;

    wsService.sendMessage(
      `/app/group/${id}/${destination}`,
      payload
    );
  };


  const updateBaseline = (value: number) => {
    sendCommand(
        "hartslag",{
      value
    });
  };

  const updateVariability = (value: number) => {
    sendCommand(
        "variabiliteit",{
      value,
    });
  };

  const triggerContraction = () => {
    sendCommand("contraction");
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
    <label>Baseline</label>
    <input
      type="number"
      value={baselineInput}
      onChange={(e) =>
        setBaselineInput(Number(e.target.value))
      }
    />
    <button
      onClick={() => updateBaseline(baselineInput)}
      >
      Confirm Baseline
      </button>
    </div>

    <div>
    <label>Variability</label>
    <input
      type="number"
      value={variabilityInput}
      onChange={(e) =>
        setVariabilityInput(Number(e.target.value))
      }
    />
    <button
      onClick={() => updateVariability(variabilityInput)}
    >
      Confirm Variability
    </button>
  </div>
</div>

        <div className="panel">
          <h2>Uterine Activity</h2>

          <button onClick={triggerContraction}>
            Trigger contraction
          </button>
        </div>

        <div className="panel">
          <h2>Status</h2>
          <div className="pill">
            Live points: {points.length}
          </div>
        </div>

      </div>
    </div>
  );
}