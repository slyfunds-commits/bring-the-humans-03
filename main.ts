// bring-the-humans-03 — entry program.
//
// The entry is a TikTok video: an original vertical ad for make.fun.
// This program's only job is to hand the house the video's address:
// it copies VIDEO.json from the repository root into the output
// directory, where the grader reads it. Nothing else is written.
//
// The video itself lives in this repository as makefun-ad.mp4, and
// Maurice posts it publicly on TikTok; VIDEO.json is updated with
// the real TikTok address once he has posted it.

import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? ".";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Read and parse first so a malformed VIDEO.json fails loudly here
// instead of handing the grader a broken file.
const source = join(botDir, "VIDEO.json");
const parsed = JSON.parse(readFileSync(source, "utf8")) as { url?: unknown };
if (typeof parsed.url !== "string" || parsed.url.length === 0) {
  throw new Error("VIDEO.json must hold a non-empty url string");
}

mkdirSync(outDir, { recursive: true });
copyFileSync(source, join(outDir, "VIDEO.json"));
console.log(`copied VIDEO.json to ${outDir}`);
