const WS_URL = "wss://voice-stream-ai-backend-production-b7f6.up.railway.app";

export const ws = new WebSocket(WS_URL);

ws.onopen = () => {
  console.log("WebSocket connected");
  ws.send(JSON.stringify({ type: "init" }));
};

ws.onmessage = (msg) => {
  console.log("Server:", msg.data);
};
