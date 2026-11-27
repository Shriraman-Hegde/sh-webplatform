/** Motion preference for kit animations / transitions. */
export type WebkitMotion = "on" | "off" | "system";

const MOTIONS = new Set<WebkitMotion>(["on", "off", "system"]);

export function normalizeMotion(
  value: string | null | undefined,
): WebkitMotion {
  if (value && MOTIONS.has(value as WebkitMotion)) {
    return value as WebkitMotion;
  }
  return "system";
}

export function applyMotion(
  motion: string | null | undefined,
  root: ParentNode & { documentElement?: HTMLElement } = document,
): WebkitMotion {
  const next = normalizeMotion(motion);
  const el =
    "documentElement" in root && root.documentElement
      ? root.documentElement
      : (root as unknown as HTMLElement);
  el.setAttribute("data-motion", next);
  return next;
}

export function getMotion(
  root: ParentNode & { documentElement?: HTMLElement } = document,
): WebkitMotion {
  const el =
    "documentElement" in root && root.documentElement
      ? root.documentElement
      : (root as unknown as HTMLElement);
  return normalizeMotion(el.getAttribute("data-motion"));
}
