import { useEffect, useMemo, useState } from "react";
import "./Class_Student.css";
import CtgChart from "../../components/CtgChart/CtgChart";
import type { CtgPoint } from "../../contracts/ctgpoint";
import { useParams } from "react-router-dom";
import { wsService } from "../../WebSocketService";

export default function Class_Student() {
  const { id } = useParams<{ id: string }>();

  const [currentCtgData, setCurrentCtgData] = useState<CtgPoint>();

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

  const chartData = useMemo(() => {
    return points.map((p, index) => ({
      ...p,
      x: index,
    }));
  }, [points]);

  return (
    <div className="dashboard-student">

      <div className="CTGGrafiek">
        <h2>CTG Grafiek</h2>
        <CtgChart data={chartData} />
      </div>

      <div className="student-status">
        <div className="pill">
          Huidige hartslag: {currentCtgData?.fhrBpm ?? "-"}
        </div>

        <div className="pill">
          Wee activiteit: {currentCtgData?.wee ?? "-"}
        </div>

        <div className="pill">
          Tijd: {currentCtgData?.timestamp ?? "-"}
        </div>
      </div>

    </div>
  );
}