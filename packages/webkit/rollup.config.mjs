import { createBasicConfig } from "@open-wc/building-rollup";

/**
 * open-wc Rollup via `createBasicConfig` plugins.
 * Dual outputs: ESM (lit peer/external) + CDN IIFE (lit bundled).
 * @see https://open-wc.org/docs/building/rollup/
 */
const { plugins } = createBasicConfig({
  outputDir: "dist",
  developmentMode: false,
});

export default [
  {
    input: "tsc-out/index.js",
    output: {
      file: "dist/webkit.esm.js",
      format: "es",
      sourcemap: true,
    },
    external: [/^lit($|\/)/, /^@lit\//],
    plugins,
    // Keep customElements.define / theme side effects when lit is external.
    treeshake: {
      moduleSideEffects: true,
    },
  },
  {
    input: "tsc-out/cdn.js",
    output: {
      file: "dist/webkit.cdn.min.js",
      format: "iife",
      name: "ShWebkit",
      sourcemap: true,
    },
    plugins,
  },
];
