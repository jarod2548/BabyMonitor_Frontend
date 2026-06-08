import { useEffect, useState } from "react";
import "./Class_Student.css";
import CtgChart from "../../components/CtgChart/CtgChart";
import type { CtgPoint } from "../../contracts/ctgpoint";

export default function Class_Student() {
  const [points, setPoints] = useState<CtgPoint[]>([]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080/ws/ctg");

    ws.onmessage = (event) => {
      const newPoint: CtgPoint = JSON.parse(event.data);

      setPoints((prev) => {
        const updated = [...prev, newPoint];

        return updated.slice(-240);
      });
    };

    ws.onerror = (err) => {
      console.error("CTG WebSocket error:", err);
    };

    return () => ws.close();
  }, []);

  return (
    <div className="dashboard-student">
      <h1>Student Dashboard</h1>

      <CtgChart data={points} />
    </div>
  );
}