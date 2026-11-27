import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import { cssTextPlugin } from "../webkit/css-text-plugin.mjs";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [cssTextPlugin()],
  root: ".",
  resolve: {
    alias: {
      "@sh-webplatform/webkit/themes.css": path.resolve(
        rootDir,
        "../webkit/src/themes/themes.css",
      ),
      "@sh-webplatform/webkit": path.resolve(rootDir, "../webkit/src/index.ts"),
    },
  },
  server: { port: 5173 },
  build: {
    outDir: "dist",
  },
  test: {
    environment: "jsdom",
    include: ["src/**/*.test.ts"],
  },
});
