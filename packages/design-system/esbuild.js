import esbuild from "esbuild";
import packageJson from "./package.json" assert { type: "json" };

esbuild
  .build({
    entryPoints: ["./src/index.ts"],
    bundle: true,
    minify: false,
    sourcemap: true,
    target: "esnext",
    external: [
      ...Object.keys(packageJson.peerDependencies),
      ...Object.keys(packageJson.dependencies),
    ],
    format: "esm",
    outfile: "./dist/index.js",
  })
  .catch(() => process.exit(1));
