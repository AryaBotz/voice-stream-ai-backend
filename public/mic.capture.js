let mediaRecorder;
let chunks = [];

export async function startRecording(ws) {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

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

  mediaRecorder.start();
}

export function stopRecording() {
  mediaRecorder.stop();
}
