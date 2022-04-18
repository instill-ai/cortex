const esbuild = require("esbuild");

// Automatically exclude all node_modules from the bundled version
const { nodeExternalsPlugin } = require("esbuild-node-externals");

const sharedConfig = {
  entryPoints: ["./src/index.ts"],
  bundle: true,
  minify: true,
  sourcemap: true,
  target: "esnext",
  plugins: [nodeExternalsPlugin()],
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
