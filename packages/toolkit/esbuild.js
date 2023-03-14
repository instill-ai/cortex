const esbuild = require("esbuild");
const { peerDependencies } = require("./package.json");

const sharedConfig = {
  entryPoints: ["./src/lib/index.ts", "./src/view/index.ts", "./src/index.ts"],
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
    outdir: "./build/esm",
    target: ["esnext", "node12"],
  })
  .catch(() => process.exit(1));

esbuild
  .build({
    ...sharedConfig,
    format: "cjs",
    outdir: "./build/cjs",
    target: ["esnext", "node12"],
  })
  .catch(() => process.exit(1));
