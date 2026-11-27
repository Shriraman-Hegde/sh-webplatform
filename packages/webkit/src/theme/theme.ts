/** Theme ids are kebab-case look names, not product/industry labels. */
export const WEBKIT_THEMES = ["default", "warm", "slate", "forest"] as const;
export type WebkitTheme = (typeof WEBKIT_THEMES)[number];

const DEFAULT_THEME: WebkitTheme = "default";
const THEMES = new Set<string>(WEBKIT_THEMES);

export function normalizeTheme(value: string | null | undefined): WebkitTheme {
  if (value && THEMES.has(value)) {
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
