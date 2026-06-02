export function handleMessage(ws, data) {
  console.log("received audio chunk:", data.length);

  ws.send(JSON.stringify({
    type: "response",
    text: "audio received ✔"
  }));
}
