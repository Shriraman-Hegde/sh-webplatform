import { ContextConsumer } from "@lit/context";
import { LitElement, type CSSResultGroup } from "lit";
import {
  getIconLibrary,
  iconContext,
  type IconLibrary,
} from "../context/icons.js";
import { cssText } from "../styles/css.js";
import bootstrapCss from "../styles/bootstrap.css";

/**
 * Shared base for all wk-* elements (kit “base element” layer).
 * Host owns tokens + context; components inherit font/ink and optional icons.
 * Use native `dir` / `lang` attributes on the host for localization.
 * Shared shadow CSS lives in `src/styles/bootstrap.css`.
 */
export class WkElement extends LitElement {
  static styles: CSSResultGroup = cssText(bootstrapCss);

  #icons = new ContextConsumer(this, {
    context: iconContext,
    subscribe: true,
  });

  /** Prefer Lit context from a host provider; fall back to boot-time default. */
  protected get icons(): IconLibrary {
    return this.#icons.value ?? getIconLibrary();
  }
}
