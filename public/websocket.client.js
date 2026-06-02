const WS_URL = "wss://YOUR-RAILWAY-DOMAIN.up.railway.app";

export const ws = new WebSocket(WS_URL);

ws.onopen = () => {
  console.log("WebSocket connected");
  ws.send(JSON.stringify({ type: "init" }));
};

ws.onmessage = (msg) => {
  console.log("Server:", msg.data);
};
