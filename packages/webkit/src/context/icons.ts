import { createContext } from "@lit/context";

/** Host-owned icon library resolved via Lit context (or module default). */
export type IconLibrary = {
  get(name: string): string | undefined;
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
