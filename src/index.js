import http from "http";
import express from "express";
import { initWebSocket } from "./websocket/ws.server.js";

const app = express();
const server = http.createServer(app);

initWebSocket(server);

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log("Server running on", PORT);
});
