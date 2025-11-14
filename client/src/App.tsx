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
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, incrementByAmount } from "./redux/counterSlice";
import { useAppDispatch, useAppSelector } from "./hooks";
import { Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Info from "./pages/Info";
import NotFound from "./pages/NotFound";

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

  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState(0);

  return (
    <div>
      <button>DEc</button>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <h1>{count}</h1>
      <Routes>
        <Route path="/info" element={<Info />} />
        <Route path="/about" element={<About />} />
        {/* Catch-all 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
    // <div style={{ padding: 40 }}>
    //   <button>DEc</button>
    //   <button onClick={() => dispatch(increment())}>Increment</button>
    //   <h1>{count}</h1>
    //   <h2>InsightOps Live Monitor</h2>
    //   <LineChart width={700} height={300} data={data}>
    //     <XAxis dataKey="timestamp" />
    //     <YAxis />
    //     <Tooltip />
    //     <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
    //     <Line type="monotone" dataKey="cpu" stroke="#8884d8" name="CPU (%)" />
    //     <Line
    //       type="monotone"
    //       dataKey="memory"
    //       stroke="#82ca9d"
    //       name="Memory (%)"
    //     />
    //   </LineChart>
    // </div>
  );
}
