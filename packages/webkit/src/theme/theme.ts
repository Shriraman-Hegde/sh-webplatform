export type WebkitTheme = "finance" | "manufacturing";

const DEFAULT_THEME: WebkitTheme = "finance";

export function normalizeTheme(value: string | null | undefined): WebkitTheme {
  if (value === "manufacturing" || value === "finance") {
    return value;
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
