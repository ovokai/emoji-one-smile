import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The entry: one teddy bear. A hug you can send in a single character —
// warm at first glance, in every language, no caption needed.
const EMOJI = "🧸";

// The rules ask for exactly one emoji: guard the payload so the file can
// never grow a stray newline, BOM or extra character. One emoji, 4 bytes.
if (Buffer.byteLength(EMOJI, "utf8") !== 4 || [...EMOJI].length !== 1) {
  throw new Error("entry must be exactly one emoji");
}

function writeEntry(target: string): void {
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, EMOJI, "utf8");
}

try {
  writeEntry("/output/entry.txt");
} catch {
  // Fall back to a local file when /output is not writable.
  writeEntry("entry.txt");
}
