import { css, html } from "lit";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";
import "../wk-icon/index.js";

const toneIcon: Record<string, string> = {
  empty: "info",
  loading: "settings",
  error: "error",
};

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

  static styles = [
    WkElement.styles,
    css`
      :host {
        display: block;
      }
      .banner {
        border-radius: var(--wk-radius);
        border: 1px solid var(--wk-border);
        background: var(--wk-banner-bg);
        color: var(--wk-ink);
        padding: var(--wk-space-4);
        font-size: var(--wk-text-md);
        display: flex;
        align-items: flex-start;
        gap: var(--wk-space-3);
        box-shadow: var(--wk-shadow-sm);
      }
      .icon {
        color: var(--wk-accent);
        margin-top: 0.1rem;
      }
      :host([tone="error"]) .banner {
        border-color: color-mix(in srgb, var(--wk-danger) 40%, var(--wk-border));
        color: var(--wk-danger);
      }
      :host([tone="error"]) .icon {
        color: var(--wk-danger);
      }
      :host([tone="loading"]) .banner {
        border-style: dashed;
      }
      :host([tone="loading"]) .icon {
        animation: spin 1.1s linear infinite;
      }
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        :host([tone="loading"]) .icon {
          animation: none;
        }
      }
    `,
  ];

  render() {
    const fallback =
      this.tone === "loading"
        ? "Loading…"
        : this.tone === "error"
          ? "Something went wrong."
          : "Nothing to show yet.";
    const icon = toneIcon[this.tone] ?? "info";
    return html`<div class="banner" role="status">
      <span class="icon"><wk-icon name=${icon} size="md"></wk-icon></span>
      <span>${this.message || fallback}</span>
    </div>`;
  }
}

defineElement("wk-status-banner", WkStatusBanner);

declare global {
  interface HTMLElementTagNameMap {
    "wk-status-banner": WkStatusBanner;
  }
}
