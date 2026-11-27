/** Day / night surface mode (independent of look theme). */
export const WEBKIT_MODES = ["day", "night"] as const;
export type WebkitMode = (typeof WEBKIT_MODES)[number];

const DEFAULT_MODE: WebkitMode = "day";
const MODES = new Set<string>(WEBKIT_MODES);

export function normalizeMode(value: string | null | undefined): WebkitMode {
  if (value && MODES.has(value)) {
    return value as WebkitMode;
  }
  return DEFAULT_MODE;
}

export function applyMode(
  mode: string | null | undefined,
  root: ParentNode & { documentElement?: HTMLElement } = document,
): WebkitMode {
  const next = normalizeMode(mode);
  const el =
    "documentElement" in root && root.documentElement
      ? root.documentElement
      : (root as unknown as HTMLElement);
  el.setAttribute("data-mode", next);
  el.style.colorScheme = next === "night" ? "dark" : "light";
  return next;
}

export function getMode(
  root: ParentNode & { documentElement?: HTMLElement } = document,
): WebkitMode {
  const el =
    "documentElement" in root && root.documentElement
      ? root.documentElement
      : (root as unknown as HTMLElement);
  return normalizeMode(el.getAttribute("data-mode"));
}
