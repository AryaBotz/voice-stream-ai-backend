export function detectVoiceEnd(buffer) {
  // sementara rule sederhana
  return buffer.length > 25;
}
