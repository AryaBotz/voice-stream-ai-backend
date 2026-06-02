import { WebSocketServer } from "ws";
import { handleAudio } from "../voice.pipeline.js";

export function initWebSocket(server) {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    ws.on("message", async (msg) => {
      const data = JSON.parse(msg.toString());

      if (data.type === "audio") {
        const response = await handleAudio(data.data);
        ws.send(JSON.stringify({
          type: "response",
          text: response
        }));
      }
    });

    ws.send(JSON.stringify({ type: "connected" }));
  });
}
