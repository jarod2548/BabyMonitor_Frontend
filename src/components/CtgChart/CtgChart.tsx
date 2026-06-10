import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import "./CtgChart.css";
import type { CtgPoint } from "../../contracts/ctgpoint";

type Props = {
  data: CtgPoint[];
};

function CtgChart({ data }: Props) {
  return (
    <div className="ctg-chart">
      {/* FHR (top) */}
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data}>
          <CartesianGrid stroke="#1b2f1b" strokeDasharray="3 3" />

          <XAxis dataKey="x" type="number" hide />

          <YAxis
            domain={[50, 210]}
            ticks={[60, 90, 120, 150, 180, 210]}
            stroke="#666"
          />

          <Tooltip contentStyle={{ backgroundColor: "#0b0f0b", border: "1px solid #1b2f1b" }} />

          <Line
            type="monotone"
            dataKey="fhrBpm"
            stroke="#ff3b3b"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* TOCO (bottom) */}
      <ResponsiveContainer width="100%" height={160}>
        <LineChart data={data}>
          <CartesianGrid stroke="#1b2f1b" strokeDasharray="3 3" />

          <XAxis dataKey="x" type="number" hide />

          <YAxis
            domain={[0, 100]}
            ticks={[0, 20, 40, 60, 80, 100]}
            stroke="#666"
          />

          <Tooltip contentStyle={{ backgroundColor: "#0b0f0b", border: "1px solid #1b2f1b" }} />

          <Line
            type="monotone"
            dataKey="wee"
            stroke="#2f8cff"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CtgChart;