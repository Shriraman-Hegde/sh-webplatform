import { esbuildPlugin } from "@web/dev-server-esbuild";
import { devServerCssTextPlugin } from "./css-text-plugin.mjs";

/** @type {import('@web/dev-server').DevServerConfig} */
export default {
  open: "/demo/",
  watch: true,
  nodeResolve: true,
  appIndex: "demo/index.html",
  plugins: [
    devServerCssTextPlugin(),
    esbuildPlugin({
      ts: true,
      target: "es2022",
      tsconfig: "tsconfig.json",
    }),
  ],
};
