import ws from "./websocket.client.js";
import { startRecording, stopRecording } from "./mic.capture.js";

window.onload = () => {
  const btnStart = document.getElementById("startBtn");
  const btnStop = document.getElementById("stopBtn");
  const status = document.getElementById("status");

  function log(msg) {
    console.log(msg);
    status.innerText = msg;
  }

  ws.onopen = () => log("WS connected");

  ws.onmessage = (msg) => {
    log("SERVER: " + msg.data);
  };

  btnStart.onclick = async () => {
    log("STARTING MIC...");
    await startRecording(ws);
  };

  btnStop.onclick = () => {
    stopRecording();
    log("STOPPED");
  };
};
