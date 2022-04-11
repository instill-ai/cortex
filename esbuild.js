const esbuild = require("esbuild");

// Automatically exclude all node_modules from the bundled version
const { nodeExternalsPlugin } = require("esbuild-node-externals");

esbuild
  .build({
    entryPoints: ["./src/index.ts"],
    outfile: "build/index.js",
    bundle: true,
    minify: true,
    format: "esm",
    sourcemap: true,
    target: "esnext",
    plugins: [nodeExternalsPlugin()],
  })
  .catch(() => process.exit(1));
