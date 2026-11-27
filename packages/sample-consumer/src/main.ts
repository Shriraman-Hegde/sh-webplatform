import "@sh-webplatform/webkit/themes.css";
import "@sh-webplatform/webkit";
import {
  bootstrapWebkit,
  defaultIconLibrary,
  type WebkitMode,
  type WebkitTheme,
} from "@sh-webplatform/webkit";
import { html, render } from "lit";

const mount = document.getElementById("app");
if (!mount) {
  throw new Error("Missing #app");
}

function paint(theme: WebkitTheme, mode: WebkitMode) {
  bootstrapWebkit({
    theme,
    mode,
    icons: defaultIconLibrary,
  });
  render(html`<wk-workbench></wk-workbench>`, mount);
}

paint("default", "day");

declare global {
  interface Window {
    __setWebkitTheme?: (theme: WebkitTheme, mode?: WebkitMode) => void;
  }
}

window.__setWebkitTheme = (theme, mode = "day") => paint(theme, mode);
