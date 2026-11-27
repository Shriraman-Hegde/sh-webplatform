import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { appIconNames } from "../../webkit/src/icons/app-icon-names.ts";

/** Read the name list from disk. Importing the icon package loads Lit. */
function packagedIconNames(): readonly string[] {
  const entry = fileURLToPath(import.meta.resolve("@sh-webplatform/icons"));
  const file = path.join(path.dirname(entry), "icons/registry.generated.js");
  const text = readFileSync(file, "utf8");
  const marker = "export const generatedIconNames = ";
  const start = text.indexOf(marker);
  if (start < 0) {
    throw new Error("Could not read icon names from @sh-webplatform/icons.");
  }
  const arrayStart = text.indexOf("[", start);
  const arrayEnd = text.indexOf("]", arrayStart);
  return JSON.parse(text.slice(arrayStart, arrayEnd + 1)) as string[];
}

const packaged = new Set<string>(packagedIconNames());

/** Sister-package names, then kit-only glyphs. Same order as `webkitIconNames`. */
export const iconNames: readonly string[] = [
  ...packaged,
  ...appIconNames.filter((name) => !packaged.has(name)),
];

export function iconSource(name: string): "packaged" | "app" | undefined {
  if ((appIconNames as readonly string[]).includes(name)) return "app";
  if (packaged.has(name)) return "packaged";
  return undefined;
}
