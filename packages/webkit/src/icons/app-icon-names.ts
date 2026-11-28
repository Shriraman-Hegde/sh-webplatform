/** App glyph names. `app-icons.ts` provides a template for each one. */
export const appIconNames = [
  "calendar",
  "chevrons-left",
  "chevrons-right",
  "filter",
  "download",
  "upload",
  "copy",
  "eye",
  "eye-off",
  "mail",
  "bell",
  "file",
  "folder",
  "lock",
  "refresh",
  "search",
  "clock",
  "phone",
] as const;

export type AppIconName = (typeof appIconNames)[number];
