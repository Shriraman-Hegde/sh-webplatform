import { css, html } from "lit";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";

export class WkStatusBanner extends WkElement {
  static properties = {
    tone: { type: String, reflect: true },
    message: { type: String },
  };

  declare tone: "empty" | "loading" | "error";
  declare message: string;

  constructor() {
    super();
    this.tone = "empty";
    this.message = "";
  }

  static styles = [WkElement.styles, css`
    :host {
      display: block;
      font-family: var(--wk-font-sans);
    }
    .banner {
      border-radius: var(--wk-radius);
      border: 1px solid var(--wk-border);
      background: var(--wk-banner-bg);
      color: var(--wk-ink);
      padding: var(--wk-space-4);
      font-size: 0.95rem;
    }
    :host([tone="error"]) .banner {
      border-color: color-mix(in srgb, var(--wk-danger) 40%, var(--wk-border));
      color: var(--wk-danger);
    }
    :host([tone="loading"]) .banner {
      border-style: dashed;
    }
  `];

  render() {
    const fallback =
      this.tone === "loading"
        ? "Loading…"
        : this.tone === "error"
          ? "Something went wrong."
          : "Nothing to show yet.";
    return html`<div class="banner" role="status">${this.message || fallback}</div>`;
  }
}

defineElement("wk-status-banner", WkStatusBanner);

declare global {
  interface HTMLElementTagNameMap {
    "wk-status-banner": WkStatusBanner;
  }
}
