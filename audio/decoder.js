import { exec } from "child_process";
import fs from "fs";

export function decodeAudio(base64) {
  return new Promise((resolve, reject) => {
    const inputPath = "/tmp/input.webm";
    const outputPath = "/tmp/output.wav";

    fs.writeFileSync(inputPath, Buffer.from(base64, "base64"));

    const cmd = `
      ffmpeg -y -i ${inputPath}
      -ar 16000 -ac 1 -f wav ${outputPath}
    `;

    exec(cmd, (err) => {
      if (err) return reject(err);

      const audio = fs.readFileSync(outputPath);
      resolve(audio);
    });
  });
}
