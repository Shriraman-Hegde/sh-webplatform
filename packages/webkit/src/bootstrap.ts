import { setIconLibrary, type IconLibrary } from "./context/icons.js";
import {
  applyMode,
  type WebkitMode,
} from "./theme/mode.js";
import {
  applyMotion,
  type WebkitMotion,
} from "./theme/motion.js";
import { applyTheme, type WebkitTheme } from "./theme/theme.js";

export type BootstrapOptions = {
  theme?: WebkitTheme | string;
  /** Day / night surface mode (default: day). */
  mode?: WebkitMode | string;
  /** Optional icon registry from `@sh-webplatform/icons` (or a custom map). */
  icons?: IconLibrary;
  /**
   * Kit motion: `on` | `off` | `system` (default).
   * Sets `data-motion` on the document; components honor `--wk-motion` / `--wk-ease`.
   */
  motion?: WebkitMotion | string;
  /** Document root that receives data-* attrs (default: document). */
  root?: ParentNode & { documentElement?: HTMLElement };
};

export type BootstrapResult = {
  theme: WebkitTheme;
  mode: WebkitMode;
  motion: WebkitMotion;
};

/**
 * Host boot helper. Icons and motion are optional — omit `icons` to run without
 * an icon library; omit `motion` to follow system reduced-motion.
 */
export function bootstrapWebkit(
  options: BootstrapOptions = {},
): BootstrapResult {
  if (options.icons) {
    setIconLibrary(options.icons);
  }
  const theme = applyTheme(options.theme ?? "default", options.root);
  const mode = applyMode(options.mode ?? "day", options.root);
  const motion = applyMotion(options.motion ?? "system", options.root);
  return { theme, mode, motion };
}
