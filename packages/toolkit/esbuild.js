const esbuild = require("esbuild");
const { peerDependencies } = require("./package.json");

const sharedConfig = {
  entryPoints: ["./src/index.ts"],
  bundle: true,
  minify: true,
  sourcemap: true,
  target: "esnext",
  external: Object.keys(peerDependencies),
  platform: "node",
};

esbuild
  .build({
    ...sharedConfig,
    format: "esm",
    outdir: "./build",
    target: ["esnext", "node12"],
  })
  .catch(() => process.exit(1));

esbuild
  .build({
    ...sharedConfig,
    format: "cjs",
    outfile: "./build/index.cjs.js",
    target: ["esnext", "node12"],
  })
  .catch(() => process.exit(1));
