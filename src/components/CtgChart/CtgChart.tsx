import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line } from 'recharts';

const CtgChart= ({ isAnimationActive = true }) => (
  <LineChart
    style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
    responsive
    // data={ctg}
    margin={{
      top: 5,
      right: 30,
      left: 20,
      bottom: 5,
    }}
  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis width="auto" />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="Bpm" stroke="#8884d8" isAnimationActive={isAnimationActive} />
    <Line type="monotone" dataKey="Toco" stroke="#82ca9d" isAnimationActive={isAnimationActive} />
  </LineChart>
);

export default CtgChart;
