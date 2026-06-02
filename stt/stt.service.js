import { transcribeGroq } from "./groq.whisper.js";

export async function runSTT(audio) {
  return await transcribeGroq(audio);
}
