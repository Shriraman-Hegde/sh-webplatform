import { createContext } from "@lit/context";
import type { TemplateResult } from "lit";

/** Host-owned icon library resolved via Lit context (or module default). */
export type IconLibrary = {
  get(name: string): TemplateResult | string | undefined;
  names?: readonly string[];
};

export const iconContext = createContext<IconLibrary>(Symbol("wk-icons"));

const emptyLibrary: IconLibrary = {
  get() {
    return undefined;
  },
};

let defaultLibrary: IconLibrary = emptyLibrary;

/** Host calls once at boot (diagram: set icon libraries). */
export function setIconLibrary(library: IconLibrary): void {
  defaultLibrary = library;
}

export function getIconLibrary(): IconLibrary {
  return defaultLibrary;
}
