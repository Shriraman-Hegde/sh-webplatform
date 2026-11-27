/** App glyph names. `app-icons.ts` provides a template for each one. */
export const appIconNames = [
  "calendar",
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
  "clock",
  "phone",
] as const;

export type AppIconName = (typeof appIconNames)[number];
