  import {CartesianGrid,Legend,Line,LineChart,ResponsiveContainer,Tooltip,XAxis,YAxis,} from "recharts";
  import "./CtgChart.css";
  import { mockCtgData } from "../MockData";
  import type { CtgPoint } from "../../contracts/ctg";

  type CtgChartProps = {data?: CtgPoint[];isAnimationActive?: boolean;};

  const formatTimestamp = (timestamp: string) =>new Date(timestamp).toLocaleTimeString([], {hour: "2-digit",minute: "2-digit",});

  function CtgChart({data = mockCtgData,isAnimationActive = true,}: 
    
    CtgChartProps) {
    return (
    <div className="ctg-chart">
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" minTickGap={24} tickFormatter={formatTimestamp} />
          <YAxis yAxisId="heartRate" width={50} domain={[90, 190]} label={{ value: "BPM", angle: -90, position: "insideLeft" }} />
          <YAxis yAxisId="toco" orientation="right" width={40} domain={[0, 100]} label={{ value: "TOCO", angle: 90, position: "insideRight" }} />
          <Tooltip labelFormatter={(value) => formatTimestamp(String(value))} />
          <Legend />
          <Line yAxisId="heartRate" type="monotone" dataKey="fhrBpm" name="Foetal heart rate" stroke="#cb4335" dot={false} strokeWidth={2} isAnimationActive={isAnimationActive} />
          <Line yAxisId="toco" type="monotone" dataKey="toco" name="Contractions" stroke="#2874a6" dot={false} strokeWidth={2} isAnimationActive={isAnimationActive} />
        </LineChart>
      </ResponsiveContainer>
      </div>
    );
  }

  export default CtgChart;
