#!/usr/bin/env node
import { execSync, spawnSync } from "node:child_process";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const args = new Set(process.argv.slice(2));
const skipBuild = args.has("--skip-build");
const allowClean = args.has("--allow-clean");

const RED = "\x1b[31m";
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const CYAN = "\x1b[36m";
const RESET = "\x1b[0m";

function logStep(step, msg) {
  console.log(`\n${CYAN}[Guardrail ${step}]${RESET} ${msg}`);
}

function fail(msg) {
  console.error(`\n${RED}✖ Guardrail failed:${RESET} ${msg}`);
  process.exit(1);
}

function pass(msg) {
  console.log(`${GREEN}✔${RESET} ${msg}`);
}

function warn(msg) {
  console.warn(`${YELLOW}⚠${RESET} ${msg}`);
}

function runCmd(cmd, cmdArgs, label) {
  const res = spawnSync(cmd, cmdArgs, {
    stdio: "inherit",
    shell: process.platform === "win32",
  });
  if (res.status !== 0) {
    fail(`${label} failed (exit code ${res.status ?? 1}). Fix errors before committing or pushing.`);
  }
  pass(`${label} passed.`);
}

// 1. Check git working tree and changed files
logStep("1/5", "Checking git working tree & changed files...");
let statusOutput = "";
try {
  statusOutput = execSync("git status --porcelain -uall", { encoding: "utf8" }).trim();
} catch {
  fail("Not inside a valid git repository.");
}

if (!statusOutput && !allowClean) {
  fail("Working tree is clean — nothing to commit.");
}

const changedFiles = statusOutput
  ? statusOutput
      .split(/\r?\n/)
      .filter(Boolean)
      .map((line) => {
        const raw = line.slice(3).trim();
        const renamed = raw.includes(" -> ") ? raw.split(" -> ").pop() : raw;
        return renamed.replace(/^"+|"+$/g, "");
      })
      .filter((filePath) => existsSync(filePath) && statSync(filePath).isFile())
  : execSync("git diff-tree --no-commit-id --name-only -r HEAD", { encoding: "utf8" })
      .trim()
      .split(/\r?\n/)
      .filter(Boolean)
      .filter((filePath) => existsSync(filePath) && statSync(filePath).isFile());

pass(`Scanning ${changedFiles.length} target file(s).`);

// 2. Scan for forbidden files, merge conflicts, secrets, and brand violations
logStep("2/5", "Scanning files for secrets, conflict markers, and brand rules...");

const forbiddenFilePatterns = [
  /^\.env(\..+)?$/i,
  /\.(pem|key|p12|pfx)$/i,
  /settings\.local\.json$/i,
];

const secretPatterns = [
  { name: "Private Key", regex: /-----BEGIN (RSA |OPENSSH |EC |DSA )?PRIVATE KEY-----/ },
  { name: "GitHub Token", regex: /\bgh[pousr]_[A-Za-z0-9_]{36,}\b/ },
  { name: "OpenAI Key", regex: /\bsk-(proj-)?[A-Za-z0-9]{32,}\b/ },
  { name: "Google API Key", regex: /\bAIza[0-9A-Za-z\-_]{35}\b/ },
];

const conflictMarkerRegex = /^(<<<<<<< |=======$|>>>>>>> )/m;
const forbiddenBrandEmailRegex = /\b(triqova@gmail\.com|info@triqova\.com)\b/i;
const brandCheckedDirs = new Set(["app", "components", "content", "public"]);

const issues = [];

for (const relPath of changedFiles) {
  const baseName = path.basename(relPath);
  const topDir = relPath.split(/[\\/]/)[0];

  if (
    baseName !== ".env.example" &&
    forbiddenFilePatterns.some((pattern) => pattern.test(baseName) || pattern.test(relPath))
  ) {
    issues.push(`${relPath}: forbidden sensitive/local file must not be committed.`);
    continue;
  }

  // Skip binary files
  if (/\.(png|jpe?g|gif|webp|ico|pdf|woff2?|ttf|eot|mp4|webm)$/i.test(relPath)) {
    continue;
  }

  let content = "";
  try {
    content = readFileSync(relPath, "utf8");
  } catch {
    continue;
  }

  if (conflictMarkerRegex.test(content)) {
    issues.push(`${relPath}: contains unresolved git merge conflict markers.`);
  }

  for (const secret of secretPatterns) {
    if (secret.regex.test(content)) {
      issues.push(`${relPath}: contains potential ${secret.name}.`);
    }
  }

  if (brandCheckedDirs.has(topDir) && forbiddenBrandEmailRegex.test(content)) {
    issues.push(
      `${relPath}: uses forbidden email (triqova@gmail.com / info@triqova.com). Use qovaops@gmail.com.`
    );
  }
}

if (issues.length > 0) {
  for (const issue of issues) {
    console.error(`  - ${issue}`);
  }
  fail(`Found ${issues.length} file/content violation(s).`);
}
pass("No secrets, conflict markers, or brand contact violations found.");

// 3. TypeScript typecheck
logStep("3/5", "Running TypeScript typecheck (tsc --noEmit)...");
runCmd("npx", ["tsc", "--noEmit"], "TypeScript typecheck");

// 4. ESLint check
logStep("4/5", "Running ESLint (npm run lint)...");
runCmd("npm", ["run", "lint"], "ESLint");

// 5. Production build check
if (skipBuild) {
  warn("Skipping production build check (--skip-build).");
} else {
  logStep("5/5", "Running Next.js production build (npm run build)...");
  runCmd("npm", ["run", "build"], "Next.js build");
}

console.log(`\n${GREEN}✔ All guardrails passed! Ready to commit and push.${RESET}\n`);
