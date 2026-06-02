import { createServer } from "http";
import { app } from "./app.js";
import { initWebSocket } from "./websocket/ws.server.js";

const server = createServer(app);

initWebSocket(server);

server.listen(3000, () => {
  console.log("Voice backend running");
});
