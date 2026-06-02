import axios from "axios";

export async function runSTT(audioBuffer) {
  const form = new FormData();

  form.append("file", new Blob([audioBuffer]), "audio.wav");
  form.append("model", "whisper-large-v3");

  const res = await axios.post(
    "https://api.groq.com/openai/v1/audio/transcriptions",
    form,
    {
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`
      }
    }
  );

  return res.data.text;
}
