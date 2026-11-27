import { esbuildPlugin } from "@web/dev-server-esbuild";
import { playwrightLauncher } from "@web/test-runner-playwright";
import { devServerCssTextPlugin } from "./css-text-plugin.mjs";

export default {
  files: ["test/**/*.test.ts"],
  nodeResolve: true,
  concurrency: 1,
  browsers: [playwrightLauncher({ product: "chromium" })],
  testFramework: {
    config: {
      ui: "bdd",
      timeout: 4000,
    },
  },
  plugins: [
    devServerCssTextPlugin(),
    esbuildPlugin({
      ts: true,
      target: "es2022",
      tsconfig: "tsconfig.json",
    }),
  ],
};
