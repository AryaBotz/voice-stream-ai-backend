import { decodeAudio } from "./audio/decoder.js";
import { runSTT } from "./stt/stt.service.js";
import { runLLM } from "./llm/llm.service.js";

export async function handleAudio(base64Audio) {
  // 1. decode WebM → WAV/PCM
  const wavBuffer = await decodeAudio(base64Audio);

  // 2. STT (Groq Whisper)
  const text = await runSTT(wavBuffer);

  // 3. LLM response
  const reply = await runLLM(text);

  return reply;
}
