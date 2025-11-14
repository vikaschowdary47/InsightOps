import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import si from "systeminformation";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("Client connected");

  setInterval(async () => {
    const load = await si.currentLoad();
    const mem = await si.mem();
    const metrics = {
      cpu: load.currentLoad.toFixed(1),
      memory: ((mem.active / mem.total) * 100).toFixed(1),
      timestamp: new Date().toLocaleTimeString(),
    };
    console.log({ metrics });
    socket.emit("metrics", metrics);
  }, 3000);
});

server.listen(4000, () => console.log("Server running on port 4000"));
