const ws = new WebSocket("wss://voice-stream-ai-backend-production-b7f6.up.railway.app");

ws.onopen = () => {
  console.log("connected");
};

ws.onmessage = (msg) => {
  console.log("AI:", msg.data);
};

export default ws;
