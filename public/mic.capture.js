import { encodeAudioChunk } from "./audio.encoder.js";
import { ws } from "./websocket.client.js";

let mediaRecorder;
let stream;

export async function startMic() {
  stream = await navigator.mediaDevices.getUserMedia({ audio: true });

  mediaRecorder = new MediaRecorder(stream);

  mediaRecorder.ondataavailable = async (event) => {
    if (event.data.size > 0 && ws.readyState === 1) {
      const buffer = await event.data.arrayBuffer();
      const encoded = encodeAudioChunk(buffer);

      ws.send(encoded);
    }
  };

  mediaRecorder.start(250); // chunk 250ms
}

export function stopMic() {
  if (mediaRecorder) mediaRecorder.stop();
  if (stream) stream.getTracks().forEach(t => t.stop());
}
