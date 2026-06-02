import ws from "./websocket.client.js";
import { startRecording, stopRecording } from "./mic.capture.js";

let isRecording = false;

window.onload = () => {
  const btnStart = document.getElementById("startBtn");
  const btnStop = document.getElementById("stopBtn");
  const statusEl = document.getElementById("status");
  const logEl = document.getElementById("log");

  function log(msg) {
    console.log(msg);
    if (logEl) logEl.innerText += msg + "\n";
  }

  // WebSocket events
  ws.onopen = () => {
    log("WS connected");
    statusEl.innerText = "Connected";
  };

  ws.onerror = () => {
    log("WS error");
  };

  ws.onclose = () => {
    log("WS closed");
    statusEl.innerText = "Disconnected";
  };

  ws.onmessage = (msg) => {
    log("Server: " + msg.data);
  };

  // START
  btnStart.onclick = async () => {
    if (isRecording) return;

    if (!ws || ws.readyState !== 1) {
      log("WS not ready");
      return;
    }

    try {
      log("Starting mic...");
      isRecording = true;

      await startRecording(ws);

      statusEl.innerText = "Recording";
      log("Recording started");
    } catch (err) {
      console.error(err);
      log("Mic error");
      isRecording = false;
    }
  };

  // STOP
  btnStop.onclick = () => {
    if (!isRecording) return;

    stopRecording();
    isRecording = false;

    statusEl.innerText = "Idle";
    log("Recording stopped");
  };
};
