import { startMic, stopMic } from "./mic.capture.js";

const statusEl = document.getElementById("status");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");

startBtn.onclick = async () => {
  statusEl.textContent = "Listening...";
  await startMic();
};

stopBtn.onclick = () => {
  statusEl.textContent = "Stopped";
  stopMic();
};
