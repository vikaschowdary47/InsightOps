import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

type Metric = {
  cpu: number;
  memory: number;
  timestamp: string;
};

const socket = io("http://localhost:4000");

export default function App() {
  const [data, setData] = useState<Metric[]>([]); // explicitly typed

  useEffect(() => {
    socket.on("metrics", (msg: Metric) => {
      setData((prev) => [...prev.slice(), msg]); // now TypeScript knows msg is Metric
    });

    return () => {
      socket.off("metrics");
    };
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h2>InsightOps Live Monitor</h2>
      <LineChart width={700} height={300} data={data}>
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Line type="monotone" dataKey="cpu" stroke="#8884d8" name="CPU (%)" />
        <Line
          type="monotone"
          dataKey="memory"
          stroke="#82ca9d"
          name="Memory (%)"
        />
      </LineChart>
    </div>
  );
}
