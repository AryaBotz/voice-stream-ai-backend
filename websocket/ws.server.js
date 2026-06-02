import { WebSocketServer } from "ws";
import { handleMessage } from "./ws.router.js";

export function initWebSocket(server) {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    console.log("Client connected");

    ws.on("message", (data) => {
      handleMessage(ws, data);
    });

    ws.send(JSON.stringify({
      type: "ready",
      text: "server ready"
    }));
  });
}
