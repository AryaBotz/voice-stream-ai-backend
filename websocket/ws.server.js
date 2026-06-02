import { WebSocketServer } from "ws";
import { handleMessage } from "./ws.router.js";

export function initWebSocket(server) {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    ws.sessionId = "sess_" + Math.random().toString(36).slice(2, 8);

    ws.on("message", (data) => handleMessage(ws, data));

    ws.send(JSON.stringify({
      type: "connected",
      sessionId: ws.sessionId
    }));
  });
}
