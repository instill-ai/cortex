import { execSync } from "node:child_process";
import glob from "fast-glob";

const pattern = "src/**/*.test.ts";

const matches = glob.sync(pattern);

if (matches.length === 0) {
  throw new Error(`No tests match the pattern: ${pattern}`);
}

const spaceSeparatedMatches = matches.join(" ");

const runCommand = (command: string): void => {
  console.log(`RUN: ${command}`);
  execSync(command, { stdio: "inherit" });
  console.log();
};

runCommand(`node --loader tsx --no-warnings --test ${spaceSeparatedMatches}`);
