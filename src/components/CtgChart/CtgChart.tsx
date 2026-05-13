  import {CartesianGrid,Legend,Line,LineChart,ResponsiveContainer,Tooltip,XAxis,YAxis,} from "recharts";
  import "./CtgChart.css";
  import { mockCtgData } from "../MockData";
  import type { CtgPoint } from "../../contracts/ctgpoint";

  type CtgChartProps = {data?: CtgPoint[];isAnimationActive?: boolean;};

  const formatTimestamp = (timestamp: string) =>new Date(timestamp).toLocaleTimeString([], {hour: "2-digit",minute: "2-digit",});

  const formatMMSS = (value: number) => {
  const seconds = value * 2; // optional scaling (depends on speed)

  const minutes = Math.floor(seconds / 60);
  const sec = seconds % 60;

  return `${minutes}.${sec.toString().padStart(2, "0")}`;
}

  function CtgChart({data = mockCtgData,isAnimationActive = true,}: CtgChartProps) {
    return (
    <div className="ctg-chart">
      {/* Bovenste Chart: foetale hartslag */}
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" interval={59} tickFormatter={formatMMSS}/>
          <YAxis yAxisId="heartRate" width={50} domain={[50, 210]} tickFormatter={(value) => Math.round(value).toString()} label={{ value: "BPM", angle: -90, position: "insideLeft" }} />
          <Tooltip labelFormatter={(value) => formatTimestamp(String(value))} />
          <Legend />
          <Line yAxisId="heartRate" type="monotone" dataKey="fhrBpm" name="Foetal heart rate" stroke="#cb4335" dot={false} strokeWidth={2} isAnimationActive={isAnimationActive} />
        </LineChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" interval={59} tickFormatter={formatMMSS}/>
          <YAxis yAxisId="toco" width={50} domain={[0, 100]} tickFormatter={(value) => Math.round(value).toString()}  label={{ value: "TOCO", angle: -90, position: "insideLeft" }} />
          <Tooltip labelFormatter={(value) => formatTimestamp(String(value))} />
          <Legend />
          <Line yAxisId="toco" type="monotone" dataKey="toco" name="Contractions" stroke="#2874a6" dot={false} strokeWidth={2} isAnimationActive={isAnimationActive} />
        </LineChart>
      </ResponsiveContainer>
      </div>
    );
  }

  export default CtgChart;
