let mediaRecorder;
let chunks = [];

export async function startRecording(ws) {
  chunks = []; // FIX 1

  if (!ws || ws.readyState !== 1) {
    console.log("WS not ready");
    return;
  }

  const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    .catch(err => {
      console.error("Mic denied", err);
      return null;
    });

  if (!stream) return;

  mediaRecorder = new MediaRecorder(stream, {
    mimeType: "audio/webm;codecs=opus"
  });

  mediaRecorder.ondataavailable = (e) => {
    chunks.push(e.data);
  };

  mediaRecorder.onstop = async () => {
    const blob = new Blob(chunks, { type: "audio/webm" });
    chunks = [];

    const reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result.split(",")[1];

      ws.send(JSON.stringify({
        type: "audio",
        data: base64
      }));
    };

    reader.readAsDataURL(blob);
  };

  mediaRecorder.start(); // atau mediaRecorder.start(1000)
}

export function stopRecording() {
  if (!mediaRecorder) return;

  mediaRecorder.stop();

  mediaRecorder.stream?.getTracks().forEach(t => t.stop());
}
