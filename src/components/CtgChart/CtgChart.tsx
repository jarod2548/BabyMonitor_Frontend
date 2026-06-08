  import {CartesianGrid,Legend,Line,LineChart,ResponsiveContainer,Tooltip,XAxis,YAxis,} from "recharts";
  import "./CtgChart.css";
  import { mockCtgData } from "../MockData";
  import type { CtgPoint } from "../../contracts/ctgpoint";

  type CtgChartProps = {data?: CtgPoint[];
    isAnimationActive?: boolean;
    speed? : number;};

  function CtgChart({data = mockCtgData,isAnimationActive = true}: CtgChartProps) {

    const formatMMSS = (elapsedTime: number) => {
    const totalSeconds = Math.floor(elapsedTime / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };
    return (
    <div className="ctg-chart">
      {/* Bovenste Chart: foetale hartslag */}
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" minTickGap={20} tickFormatter={formatMMSS} type="number" domain={['dataMin', 'dataMax']}/>
          <YAxis yAxisId="heartRate" width={50} domain={[50, 210]} tickFormatter={(value) => Math.round(value).toString()} label={{ value: "BPM", angle: -90, position: "insideLeft" }} />
          <Tooltip labelFormatter={(value) => formatMMSS(value)} />
          <Legend />
          <Line yAxisId="heartRate" type="monotone" dataKey="fhrBpm" name="Foetal heart rate" stroke="#cb4335" dot={false} strokeWidth={2} isAnimationActive={isAnimationActive} />
        </LineChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" minTickGap={20}  tickFormatter={formatMMSS} type="number" domain={['dataMin', 'dataMax']}/>
          <YAxis yAxisId="toco" width={50} domain={[0, 100]} tickFormatter={(value) => Math.round(value).toString()}  label={{ value: "TOCO", angle: -90, position: "insideLeft" }} />
          <Tooltip labelFormatter={(value) => formatMMSS(value)} />
          <Legend />
          <Line yAxisId="toco" type="monotone" dataKey="toco" name="Contractions" stroke="#2874a6" dot={false} strokeWidth={2} isAnimationActive={isAnimationActive} />
        </LineChart>
      </ResponsiveContainer>
      </div>
    );
  }

  export default CtgChart;
