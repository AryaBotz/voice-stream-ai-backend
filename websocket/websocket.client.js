const ws = new WebSocket("ws://:voice-stream-ai-backend-production-b7f6.up.railway.app");

ws.onopen = () => {
  console.log("connected");
};

ws.onmessage = (msg) => {
  console.log("server:", msg.data);
};

// TEST SEND DATA
setInterval(() => {
  ws.send("audio_chunk_dummy");
}, 2000);
