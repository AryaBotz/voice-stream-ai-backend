const sessions = new Map();

export function getSession(id) {
  if (!sessions.has(id)) {
    sessions.set(id, {
      audioBuffer: [],
      state: "IDLE"
    });
  }
  return sessions.get(id);
}
