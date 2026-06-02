import { askGroq } from "./groq.chat.js";

export async function runLLM(text) {
  return await askGroq(text);
}
