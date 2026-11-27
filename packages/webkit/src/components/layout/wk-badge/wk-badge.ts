import { css, html } from "lit";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";

export class WkBadge extends WkElement {
  static properties = {
    tone: { type: String, reflect: true },
  };

  declare tone: "neutral" | "accent" | "success" | "danger";

  constructor() {
    super();
    this.tone = "neutral";
  }

  static styles = [
    WkElement.styles,
    css`
      :host {
        display: inline-flex;
      }
      span {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        font-size: 0.75rem;
        font-weight: 700;
        letter-spacing: 0.02em;
        text-transform: uppercase;
        padding: 0.2rem 0.55rem;
        border-radius: 999px;
        border: 1px solid var(--wk-border);
        background: var(--wk-surface);
        color: var(--wk-muted);
      }
      :host([tone="accent"]) span {
        background: color-mix(in srgb, var(--wk-accent) 14%, var(--wk-surface));
        border-color: color-mix(in srgb, var(--wk-accent) 35%, var(--wk-border));
        color: var(--wk-accent);
      }
      :host([tone="success"]) span {
        background: color-mix(in srgb, var(--wk-success) 12%, var(--wk-surface));
        border-color: color-mix(in srgb, var(--wk-success) 35%, var(--wk-border));
        color: var(--wk-success);
      }
      :host([tone="danger"]) span {
        background: color-mix(in srgb, var(--wk-danger) 12%, var(--wk-surface));
        border-color: color-mix(in srgb, var(--wk-danger) 35%, var(--wk-border));
        color: var(--wk-danger);
      }
    `,
  ];

  render() {
    return html`<span><slot></slot></span>`;
  }
}

defineElement("wk-badge", WkBadge);

declare global {
  interface HTMLElementTagNameMap {
    "wk-badge": WkBadge;
  }
}
