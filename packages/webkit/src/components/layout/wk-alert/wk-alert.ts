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
    size: { type: String, reflect: true },
    /** Optional explicit icon name. */
    icon: { type: String },
    /** When true (and no `icon`), show the tone’s default icon. Off by default. */
    showIcon: { type: Boolean, attribute: "show-icon", reflect: true },
  };

  declare tone: "info" | "success" | "warning" | "danger";
  declare heading: string;
  declare size: "sm" | "md" | "lg";
  declare icon: string;
  declare showIcon: boolean;

  constructor() {
    super();
    this.tone = "info";
    this.heading = "";
    this.size = "md";
    this.icon = "";
    this.showIcon = false;
  }

  static styles = [
    WkElement.styles,
    css`
      :host {
        display: block;
      }
      :host([size="sm"]) .alert {
        padding: var(--wk-space-3);
        gap: var(--wk-space-2);
      }
      :host([size="lg"]) .alert {
        padding: var(--wk-space-5);
        gap: var(--wk-space-4);
      }
      .alert {
        border-radius: var(--wk-radius);
        border: 1px solid var(--wk-border);
        background: var(--wk-banner-bg);
        padding: var(--wk-space-4);
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--wk-space-3);
        align-items: start;
        box-shadow: var(--wk-shadow-sm);
      }
      .alert.has-icon {
        grid-template-columns: auto 1fr;
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
        font-size: var(--wk-control-font, var(--wk-text-md));
        font-weight: 700;
      }
      .body {
        margin: 0;
        font-size: var(--wk-text-sm);
        line-height: var(--wk-leading);
        color: var(--wk-ink);
      }
      :host([size="sm"]) .body {
        font-size: var(--wk-text-xs);
      }
      :host([size="lg"]) .heading {
        font-size: var(--wk-text-lg);
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

  private resolveIcon(): string | null {
    const explicit = this.icon?.trim();
    if (explicit) return explicit;
    if (this.showIcon) return toneIcon[this.tone] || "info";
    return null;
  }

  render() {
    const name = this.resolveIcon();
    return html`
      <div class="alert ${name ? "has-icon" : ""}" role="alert">
        ${name
          ? html`<span class="icon"
              ><wk-icon
                name=${name}
                size=${this.size === "sm" ? "sm" : "md"}
              ></wk-icon
            ></span>`
          : null}
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
