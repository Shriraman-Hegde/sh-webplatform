import { css, html } from "lit";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";

export class WkSpinner extends WkElement {
  static properties = {
    label: { type: String },
    size: { type: String, reflect: true },
  };

  declare label: string;
  declare size: "sm" | "md" | "lg";

  constructor() {
    super();
    this.label = "Loading";
    this.size = "md";
  }

  static styles = [
    WkElement.styles,
    css`
      :host {
        display: inline-flex;
        align-items: center;
        gap: var(--wk-space-2);
        color: var(--wk-muted);
        font-size: 0.9rem;
      }
      .ring {
        border-radius: 50%;
        border: 2px solid var(--wk-border);
        border-top-color: var(--wk-accent);
        animation: spin 0.7s linear infinite;
      }
      :host([size="sm"]) .ring {
        width: 0.9rem;
        height: 0.9rem;
      }
      :host([size="md"]) .ring,
      :host(:not([size])) .ring {
        width: 1.15rem;
        height: 1.15rem;
      }
      :host([size="lg"]) .ring {
        width: 1.6rem;
        height: 1.6rem;
      }
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .ring {
          animation: none;
          border-top-color: var(--wk-accent);
        }
      }
    `,
  ];

  render() {
    return html`
      <span class="ring" aria-hidden="true"></span>
      <span role="status">${this.label}</span>
    `;
  }
}

defineElement("wk-spinner", WkSpinner);

declare global {
  interface HTMLElementTagNameMap {
    "wk-spinner": WkSpinner;
  }
}
