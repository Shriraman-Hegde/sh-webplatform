import { generatedIconNames, iconRegistry } from "@sh-webplatform/icons";
import type { IconLibrary } from "./context/icons.js";
import { appIconNames, appIcons } from "./icons/app-icons.js";

/** Sister-package names plus the kit's app glyphs. */
const packaged = new Set<string>(generatedIconNames);

export const webkitIconNames: readonly string[] = [
  ...generatedIconNames,
  ...appIconNames.filter((name) => !packaged.has(name)),
];

/**
 * Default icon library for demo, Storybook, and the sample app.
 * App glyphs win when a name also exists in `@sh-webplatform/icons`.
 */
export const defaultIconLibrary: IconLibrary = {
  names: webkitIconNames,
  get(name) {
    const extra = appIcons[name];
    return extra ? extra() : iconRegistry.get(name);
  },
};
