const esbuild = require("esbuild");
const { peerDependencies } = require("./package.json");

const sharedConfig = {
  entryPoints: ["./src/index.ts"],
  bundle: true,
  minify: false,
  sourcemap: true,
  target: "esnext",
  external: Object.keys(peerDependencies),
};

esbuild
  .build({
    ...sharedConfig,
    format: "esm",
    outfile: "./build/index.esm.js",
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
