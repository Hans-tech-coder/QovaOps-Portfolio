#!/usr/bin/env node
import { readFileSync } from "node:fs";

const RED = "\x1b[31m";
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const RESET = "\x1b[0m";

const args = process.argv.slice(2);
let rawMessage = "";

const msgFlagIdx = args.indexOf("--msg");
if (msgFlagIdx !== -1 && args[msgFlagIdx + 1]) {
  rawMessage = args[msgFlagIdx + 1];
} else if (args[0]) {
  rawMessage = readFileSync(args[0], "utf8");
} else {
  console.error(`${RED}✖ Usage: node scripts/validate-commit-msg.mjs <file> | --msg "<message>"${RESET}`);
  process.exit(1);
}

// Strip git comments (# ...)
const lines = rawMessage
  .split(/\r?\n/)
  .filter((line) => !line.startsWith("#"));

while (lines.length > 0 && lines[lines.length - 1].trim() === "") {
  lines.pop();
}

const subject = (lines[0] ?? "").trim();

// Allow auto-generated git merge/revert subjects if needed
if (/^(Merge |Revert ") /.test(subject)) {
  process.exit(0);
}

const errors = [];
const warnings = [];

// 1. Conventional Commit header: <type>(<scope>): <imperative summary>
const headerRegex = /^(feat|fix|refactor|perf|docs|test|chore|build|ci|style|revert)(\([a-z0-9._/-]+\))?!?: (.+)$/;
const match = subject.match(headerRegex);

if (!match) {
  errors.push(
    `Subject must match Conventional Commits format: <type>(<scope>): <imperative summary> (allowed types: feat, fix, refactor, perf, docs, test, chore, build, ci, style, revert).`
  );
} else {
  const summary = match[3];
  const firstWord = summary.split(/\s+/)[0].toLowerCase();
  const nonImperative = new Set([
    "added",
    "adds",
    "adding",
    "fixed",
    "fixes",
    "fixing",
    "updated",
    "updates",
    "updating",
    "removed",
    "removes",
    "removing",
    "changed",
    "changes",
    "changing",
    "implemented",
    "implements",
    "implementing",
    "created",
    "creates",
    "creating",
  ]);
  if (nonImperative.has(firstWord)) {
    errors.push(
      `Use imperative mood in summary ("add", "fix", "remove"), not "${firstWord}".`
    );
  }
}

// 2. Length cap (<= 72 hard cap, <= 50 ideal)
if (subject.length > 72) {
  errors.push(`Subject line is ${subject.length} chars (hard cap is 72).`);
} else if (subject.length > 50) {
  warnings.push(`Subject line is ${subject.length} chars (caveman-commit prefers ≤50 when possible).`);
}

// 3. No trailing period
if (subject.endsWith(".")) {
  errors.push("Subject line must not end with a period.");
}

// 4. Blank line between subject and body
if (lines.length > 1 && lines[1].trim() !== "") {
  errors.push("Leave a blank line between the subject line and the body.");
}

// 5. Body & caveman-commit anti-fluff checks
const fullText = lines.join("\n");
const bannedPhrases = [
  { regex: /\bthis commit\b/i, label: '"This commit..."' },
  { regex: /\bas requested by\b/i, label: '"As requested by..."' },
  { regex: /\bgenerated with claude\b/i, label: '"Generated with Claude..."' },
];

for (const banned of bannedPhrases) {
  if (banned.regex.test(fullText)) {
    errors.push(`Commit message contains banned filler phrase: ${banned.label}.`);
  }
}

for (let i = 2; i < lines.length; i++) {
  const line = lines[i];
  if (/^\s*\*\s+/.test(line)) {
    errors.push(`Line ${i + 1}: Use "-" for bullets instead of "*".`);
  }
  const isTrailer = /^[A-Za-z-]+:\s/.test(line) || /^BREAKING CHANGE:\s/.test(line);
  const hasUrl = /https?:\/\//.test(line);
  if (!isTrailer && !hasUrl && line.length > 72) {
    errors.push(`Line ${i + 1} exceeds 72 characters (${line.length} chars). Wrap body lines at 72.`);
  }
}

if (warnings.length > 0) {
  for (const w of warnings) {
    console.warn(`${YELLOW}⚠ [caveman-commit] ${w}${RESET}`);
  }
}

if (errors.length > 0) {
  console.error(`\n${RED}✖ [caveman-commit] Commit message rejected:${RESET}`);
  for (const err of errors) {
    console.error(`  - ${err}`);
  }
  console.error(`\n  Subject was: "${subject}"\n`);
  process.exit(1);
}

console.log(`${GREEN}✔ [caveman-commit] Commit message valid:${RESET} "${subject}"`);
