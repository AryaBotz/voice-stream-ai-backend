import { runSTT } from "../stt/stt.service.js";
import { runLLM } from "../llm/llm.service.js";

export async function processAudio(audio) {
  const text = await runSTT(audio);

  if (!text) return "no speech";

  const reply = await runLLM(text);

  return reply;
}
