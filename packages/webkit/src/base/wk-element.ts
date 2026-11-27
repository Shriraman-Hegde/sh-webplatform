import { ContextConsumer } from "@lit/context";
import { LitElement, css, type CSSResultGroup } from "lit";
import {
  getIconLibrary,
  iconContext,
  type IconLibrary,
} from "../context/icons.js";

/**
 * Shared base for all wk-* elements (kit “base element” layer).
 * Host owns tokens + context; components inherit font/ink and optional icons.
 * Use native `dir` / `lang` attributes on the host for localization.
 */
export class WkElement extends LitElement {
  static styles: CSSResultGroup = css`
    :host {
      box-sizing: border-box;
      font-family: var(--wk-font-sans);
      color: var(--wk-ink);
    }
    :host *,
    :host *::before,
    :host *::after {
      box-sizing: border-box;
    }
  `;

  #icons = new ContextConsumer(this, {
    context: iconContext,
    subscribe: true,
  });

  /** Prefer Lit context from a host provider; fall back to boot-time default. */
  protected get icons(): IconLibrary {
    return this.#icons.value ?? getIconLibrary();
  }
}
