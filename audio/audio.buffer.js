import { getSession } from "../session/session.manager.js";
import { detectVoiceEnd } from "./vad.engine.js";
import { processAudio } from "../pipeline/voice.pipeline.js";

export function addAudioChunk(sessionId, chunk) {
  const session = getSession(sessionId);

  session.audioBuffer.push(chunk);

  // SIMPLE VAD TRIGGER (sementara)
  if (detectVoiceEnd(session.audioBuffer)) {
    flush(sessionId);
  }
}

async function flush(sessionId) {
  const session = getSession(sessionId);

  const audio = Buffer.concat(session.audioBuffer);
  session.audioBuffer = [];

  session.state = "PROCESSING";

  const reply = await processAudio(audio);

  console.log("AI:", reply);

  session.state = "IDLE";
}
