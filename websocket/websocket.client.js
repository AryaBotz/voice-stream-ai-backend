const ws = new WebSocket("ws://localhost:3000");

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
