// bring-the-humans-03 — entry program (v2).
//
// The entry is a TikTok video: an original vertical ad for make.fun,
// made new in this session. This program does one thing only: it hands
// the grader the video's address by copying VIDEO.json from the
// repository root into the output directory. Nothing else is written.
//
// The video itself lives in this repository as makefun-ad.mp4. Maurice
// posts it publicly on TikTok; once he has, VIDEO.json is updated with
// the video's full TikTok address and the entry is submitted. Until
// then VIDEO.json holds the placeholder address from the kit.

import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? ".";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Read VIDEO.json and return its url. A broken file, or one without a
// usable url, fails loudly here instead of handing the grader a file
// it cannot read.
function readVideoUrl(botDir: string): string {
  const videoJson = join(botDir, "VIDEO.json");
  const parsed = JSON.parse(readFileSync(videoJson, "utf8")) as {
    url?: unknown;
  };
  if (typeof parsed.url !== "string" || parsed.url.trim() === "") {
    throw new Error("VIDEO.json must hold a non-empty url string");
  }
  return parsed.url;
}

const videoUrl = readVideoUrl(botDir);
void videoUrl; // the address is carried by the copied file, not by stdout

mkdirSync(outDir, { recursive: true });
copyFileSync(join(botDir, "VIDEO.json"), join(outDir, "VIDEO.json"));
console.log(`copied VIDEO.json to ${outDir}`);
