import ws from "./websocket.client.js";
import { startRecording, stopRecording } from "./mic.capture.js";

let isRecording = false;

// Ambil element UI
const btnStart = document.getElementById("btnStart");
const btnStop = document.getElementById("btnStop");
const statusEl = document.getElementById("status");
const logEl = document.getElementById("log");

// helper log UI
function log(msg) {
  console.log(msg);
  if (logEl) {
    logEl.innerText += msg + "\n";
  }
}

// WebSocket status handler
ws.onopen = () => {
  log("WS connected");
  if (statusEl) statusEl.innerText = "Connected";
};

ws.onerror = (err) => {
  log("WS error");
  console.error(err);
};

ws.onclose = () => {
  log("WS closed");
  if (statusEl) statusEl.innerText = "Disconnected";
};

// receive response dari server
ws.onmessage = (msg) => {
  try {
    const data = JSON.parse(msg.data);

    if (data.type === "response") {
      log("AI: " + data.text);
    }
  } catch (e) {
    log("RAW: " + msg.data);
  }
};

// START BUTTON
btnStart.onclick = async () => {
  if (!ws || ws.readyState !== 1) {
    log("WS not ready");
    return;
  }

  if (isRecording) {
    log("Already recording");
    return;
  }

  try {
    log("Starting mic...");

    isRecording = true;
    await startRecording(ws);

    log("Recording started");
  } catch (err) {
    console.error(err);
    log("Mic error");
    isRecording = false;
  }
};

// STOP BUTTON
btnStop.onclick = () => {
  if (!isRecording) return;

  stopRecording();
  isRecording = false;

  log("Recording stopped");
};
