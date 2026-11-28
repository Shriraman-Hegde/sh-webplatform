import fs from "node:fs";
import path from "node:path";

function isStyleModule(file) {
  const normalized = file.split("?")[0].split(path.sep).join("/");
  return normalized.endsWith(".css") && normalized.includes("/src/styles/");
}

/** Vite: import of src/styles/*.css yields the CSS text, not an injected sheet. */
export function cssTextPlugin() {
  const prefix = "\0webkit-css:";
  return {
    name: "webkit-css-text",
    enforce: "pre",
    resolveId(source, importer) {
      if (!importer || !source.endsWith(".css")) return null;
      const resolved = path.resolve(
        path.dirname(importer.split("?")[0]),
        source,
      );
      if (!isStyleModule(resolved)) return null;
      return prefix + resolved.slice(0, -4);
    },
    load(id) {
      if (!id.startsWith(prefix)) return null;
      const file = `${id.slice(prefix.length)}.css`;
      this.addWatchFile(file);
      const css = fs.readFileSync(file, "utf8");
      return `export default ${JSON.stringify(css)};`;
    },
  };
}

/** Rollup, after tsc: rewrite tsc-out CSS specifiers back to src/styles. */
export function rollupCssTextPlugin() {
  return {
    name: "webkit-css-text",
    resolveId(source, importer) {
      if (!importer || !source.endsWith(".css")) return null;
      const fromSrc = importer.includes(`${path.sep}tsc-out${path.sep}`)
        ? importer.replace(
            `${path.sep}tsc-out${path.sep}`,
            `${path.sep}src${path.sep}`,
          )
        : importer;
      const resolved = path.resolve(path.dirname(fromSrc), source);
      return isStyleModule(resolved) ? resolved : null;
    },
    load(id) {
      if (!isStyleModule(id)) return null;
      const css = fs.readFileSync(id, "utf8");
      return `export default ${JSON.stringify(css)};`;
    },
  };
}

/** Dev server / test runner: serve src/styles/*.css as JS modules. */
export function devServerCssTextPlugin() {
  return {
    name: "webkit-css-text",
    resolveMimeType(context) {
      if (context.path.includes("/styles/") && context.path.endsWith(".css")) {
        return "js";
      }
      return undefined;
    },
    transform(context) {
      if (!context.path.includes("/styles/") || !context.path.endsWith(".css")) {
        return undefined;
      }
      return `export default ${JSON.stringify(context.body)};`;
    },
  };
}
