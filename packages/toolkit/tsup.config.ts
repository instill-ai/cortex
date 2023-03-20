import { defineConfig } from "tsup";

export default defineConfig({
  sourcemap: false,
  minify: false,
  dts: false,
  format: ["esm"],
  loader: {
    ".js": "jsx",
  },
});
