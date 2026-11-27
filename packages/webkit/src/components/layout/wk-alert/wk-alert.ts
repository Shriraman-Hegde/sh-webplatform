import { css, html } from "lit";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";
import "../wk-icon/index.js";

const toneIcon: Record<string, string> = {
  info: "info",
  success: "check",
  warning: "warn",
  danger: "error",
};

export class WkAlert extends WkElement {
  static properties = {
    tone: { type: String, reflect: true },
    heading: { type: String },
    icon: { type: String },
    hideIcon: { type: Boolean, attribute: "hide-icon", reflect: true },
  };

  declare tone: "info" | "success" | "warning" | "danger";
  declare heading: string;
  declare icon: string;
  declare hideIcon: boolean;

  constructor() {
    super();
    this.tone = "info";
    this.heading = "";
    this.icon = "";
    this.hideIcon = false;
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
        grid-template-columns: auto 1fr;
        gap: var(--wk-space-3);
        align-items: start;
        box-shadow: var(--wk-shadow-sm);
      }
      :host([hide-icon]) .alert {
        grid-template-columns: 1fr;
      }
      .icon {
        margin-top: 0.1rem;
        color: var(--wk-accent);
      }
      .content {
        display: grid;
        gap: var(--wk-space-2);
      }
      .heading {
        margin: 0;
        font-size: var(--wk-text-md);
        font-weight: 700;
      }
      .body {
        margin: 0;
        font-size: var(--wk-text-sm);
        line-height: var(--wk-leading);
        color: var(--wk-ink);
      }
      :host([tone="info"]) .alert {
        border-color: color-mix(in srgb, var(--wk-accent) 35%, var(--wk-border));
      }
      :host([tone="success"]) .alert {
        background: color-mix(in srgb, var(--wk-success) 10%, var(--wk-surface));
        border-color: color-mix(in srgb, var(--wk-success) 35%, var(--wk-border));
      }
      :host([tone="success"]) .icon {
        color: var(--wk-success);
      }
      :host([tone="warning"]) .alert {
        background: color-mix(in srgb, var(--wk-warning) 10%, var(--wk-surface));
        border-color: color-mix(in srgb, var(--wk-warning) 35%, var(--wk-border));
      }
      :host([tone="warning"]) .icon {
        color: var(--wk-warning);
      }
      :host([tone="danger"]) .alert {
        background: color-mix(in srgb, var(--wk-danger) 10%, var(--wk-surface));
        border-color: color-mix(in srgb, var(--wk-danger) 35%, var(--wk-border));
        color: var(--wk-danger);
      }
      :host([tone="danger"]) .icon {
        color: var(--wk-danger);
      }
    `,
  ];

  render() {
    const name = this.icon || toneIcon[this.tone] || "info";
    return html`
      <div class="alert" role="alert">
        ${this.hideIcon
          ? null
          : html`<span class="icon"
              ><wk-icon name=${name} size="md"></wk-icon
            ></span>`}
        <div class="content">
          ${this.heading ? html`<p class="heading">${this.heading}</p>` : null}
          <div class="body"><slot></slot></div>
        </div>
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
