import { css, html } from "lit";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";

export class WkAlert extends WkElement {
  static properties = {
    tone: { type: String, reflect: true },
    heading: { type: String },
  };

  declare tone: "info" | "success" | "warning" | "danger";
  declare heading: string;

  constructor() {
    super();
    this.tone = "info";
    this.heading = "";
  }

  static styles = [
    WkElement.styles,
    css`
      :host {
        display: block;
      }
      .alert {
        border-radius: var(--wk-radius);
        border: 1px solid var(--wk-border);
        background: var(--wk-banner-bg);
        padding: var(--wk-space-4);
        display: grid;
        gap: var(--wk-space-2);
      }
      .heading {
        margin: 0;
        font-size: 0.95rem;
        font-weight: 700;
      }
      .body {
        margin: 0;
        font-size: 0.92rem;
        color: var(--wk-ink);
      }
      :host([tone="info"]) .alert {
        border-color: color-mix(in srgb, var(--wk-accent) 35%, var(--wk-border));
      }
      :host([tone="success"]) .alert {
        background: color-mix(in srgb, var(--wk-success) 10%, var(--wk-surface));
        border-color: color-mix(in srgb, var(--wk-success) 35%, var(--wk-border));
      }
      :host([tone="warning"]) .alert {
        background: color-mix(in srgb, #b45309 10%, var(--wk-surface));
        border-color: color-mix(in srgb, #b45309 35%, var(--wk-border));
      }
      :host([tone="danger"]) .alert {
        background: color-mix(in srgb, var(--wk-danger) 10%, var(--wk-surface));
        border-color: color-mix(in srgb, var(--wk-danger) 35%, var(--wk-border));
        color: var(--wk-danger);
      }
    `,
  ];

  render() {
    return html`
      <div class="alert" role="alert">
        ${this.heading ? html`<p class="heading">${this.heading}</p>` : null}
        <div class="body"><slot></slot></div>
      </div>
    `;
  }
}

defineElement("wk-alert", WkAlert);

declare global {
  interface HTMLElementTagNameMap {
    "wk-alert": WkAlert;
  }
}
