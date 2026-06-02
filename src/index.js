import { createServer } from "http";
import express from "express";
import { WebSocketServer } from "ws";

const app = express();

app.get("/", (req, res) => {
  res.json({ status: "ok" });
});

const server = createServer(app);

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", (msg) => {
    console.log("received:", msg.toString());

    // echo test dulu
    ws.send("received audio chunk");
  });

  ws.send("connected to voice server");
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("Server running on", PORT);
});
