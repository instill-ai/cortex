import esbuild from "esbuild";
import packageJson from "./package.json" assert { type: "json" };

esbuild
  .build({
    entryPoints: ["./src/index.ts"],
    bundle: true,
    minify: true,
    sourcemap: true,
    target: "esnext",
    external: Object.keys(packageJson.peerDependencies),
    format: "esm",
    outfile: "./build/index.js",
  })
  .catch(() => process.exit(1));
