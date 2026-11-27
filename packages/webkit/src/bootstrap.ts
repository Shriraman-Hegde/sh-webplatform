import { setIconLibrary, type IconLibrary } from "./context/icons.js";
import { applyTheme, type WebkitTheme } from "./theme/theme.js";

export type BootstrapOptions = {
  theme?: WebkitTheme | string;
  icons?: IconLibrary;
  /** Document root that receives `data-theme` (default: document). */
  root?: ParentNode & { documentElement?: HTMLElement };
};

/**
 * Host boot helper (diagram: load kit once, link tokens, set icon libraries).
 * Call before rendering feature UI. Tag registration happens via component imports.
 */
export function bootstrapWebkit(options: BootstrapOptions = {}): WebkitTheme {
  if (options.icons) {
    setIconLibrary(options.icons);
  }
  return applyTheme(options.theme ?? "default", options.root);
}
