let mediaRecorder;

export async function startRecording(ws) {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

  mediaRecorder = new MediaRecorder(stream, {
    mimeType: "audio/webm;codecs=opus"
  });

  mediaRecorder.ondataavailable = async (e) => {
    if (!e.data || e.data.size === 0) return;

    const buffer = await e.data.arrayBuffer();

    ws.send(buffer); // kirim binary langsung (IMPORTANT)
  };

  mediaRecorder.start(1000); // kirim tiap 1 detik
}

export function stopRecording() {
  if (!mediaRecorder) return;

  mediaRecorder.stop();
  mediaRecorder.stream?.getTracks().forEach(t => t.stop());
}
