import { addAudioChunk } from "../audio/audio.buffer.js";

export function handleMessage(ws, data) {
  // audio binary masuk sini
  addAudioChunk(ws.sessionId, data);
}
