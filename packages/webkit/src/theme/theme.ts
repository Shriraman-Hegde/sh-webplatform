/** Theme ids are kebab-case look names, not product/industry labels. */
export type WebkitTheme = "default" | "warm";

const DEFAULT_THEME: WebkitTheme = "default";

const THEMES = new Set<WebkitTheme>(["default", "warm"]);

export function normalizeTheme(value: string | null | undefined): WebkitTheme {
  if (value && THEMES.has(value as WebkitTheme)) {
    return value as WebkitTheme;
  }
  return DEFAULT_THEME;
}

export function applyTheme(
  theme: string | null | undefined,
  root: ParentNode & { documentElement?: HTMLElement } = document,
): WebkitTheme {
  const next = normalizeTheme(theme);
  const el =
    "documentElement" in root && root.documentElement
      ? root.documentElement
      : (root as unknown as HTMLElement);
  el.setAttribute("data-theme", next);
  return next;
}

export function getTheme(
  root: ParentNode & { documentElement?: HTMLElement } = document,
): WebkitTheme {
  const el =
    "documentElement" in root && root.documentElement
      ? root.documentElement
      : (root as unknown as HTMLElement);
  return normalizeTheme(el.getAttribute("data-theme"));
}
