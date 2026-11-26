import { babel } from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";

const extensions = [".ts", ".js"];

const babelPlugin = babel({
  babelHelpers: "bundled",
  extensions,
  exclude: /node_modules/,
  configFile: "./babel.config.cjs",
});

export default [
  {
    input: "src/index.ts",
    output: {
      file: "dist/webkit.esm.js",
      format: "es",
      sourcemap: true,
    },
    external: [/^lit($|\/)/],
    plugins: [resolve({ extensions }), babelPlugin],
  },
  {
    input: "src/cdn.ts",
    output: {
      file: "dist/webkit.cdn.min.js",
      format: "iife",
      name: "ShWebkit",
      sourcemap: true,
    },
    plugins: [resolve({ extensions, browser: true }), babelPlugin, terser()],
  },
];
