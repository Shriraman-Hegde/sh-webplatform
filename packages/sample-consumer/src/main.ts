import "@sh-webplatform/webkit/themes.css";
import "@sh-webplatform/webkit";
import { applyTheme, type WebkitTheme } from "@sh-webplatform/webkit";
import { html, render } from "lit";

applyTheme("finance");

const mount = document.getElementById("app");
if (!mount) {
  throw new Error("Missing #app");
}

function paint(theme: WebkitTheme) {
  applyTheme(theme);
  render(html`<wk-workbench></wk-workbench>`, mount);
}

paint("finance");

declare global {
  interface Window {
    __setWebkitTheme?: (theme: WebkitTheme) => void;
  }
}

window.__setWebkitTheme = paint;
