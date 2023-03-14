const esbuild = require("esbuild");
const { peerDependencies } = require("./package.json");

esbuild
  .build({
    entryPoints: ["./src/index.ts"],
    bundle: true,
    minify: true,
    sourcemap: true,
    target: "esnext",
    external: Object.keys(peerDependencies),
    format: "esm",
    outfile: "./build/index.js",
    target: ["esnext", "node12"],
  })
  .catch(() => process.exit(1));
