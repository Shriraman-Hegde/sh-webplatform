import { css, html, nothing } from "lit";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";
import "../../layout/wk-icon/index.js";

export class WkButton extends WkElement {
  static properties = {
    disabled: { type: Boolean, reflect: true },
    variant: { type: String, reflect: true },
    size: { type: String, reflect: true },
    icon: { type: String },
    iconPosition: { type: String, attribute: "icon-position", reflect: true },
    iconOnly: { type: Boolean, attribute: "icon-only", reflect: true },
    animated: { type: Boolean, reflect: true },
  };

  declare disabled: boolean;
  declare variant: "primary" | "secondary" | "ghost";
  declare size: "sm" | "md" | "lg";
  declare icon: string;
  declare iconPosition: "start" | "end";
  declare iconOnly: boolean;
  declare animated: boolean;

  constructor() {
    super();
    this.disabled = false;
    this.variant = "primary";
    this.size = "md";
    this.icon = "";
    this.iconPosition = "start";
    this.iconOnly = false;
    this.animated = true;
  }

  static styles = [
    WkElement.styles,
    css`
      :host {
        display: inline-block;
      }
      :host([size="sm"]) {
        --wk-control-h: var(--wk-control-h-sm);
        --wk-control-pad-x: var(--wk-control-pad-x-sm);
        --wk-control-font: var(--wk-text-sm);
      }
      :host([size="lg"]) {
        --wk-control-h: var(--wk-control-h-lg);
        --wk-control-pad-x: var(--wk-control-pad-x-lg);
        --wk-control-font: var(--wk-text-lg);
      }
      button {
        font: 600 var(--wk-control-font, var(--wk-text-md)) / 1.2
          var(--wk-font-sans);
        border-radius: var(--wk-radius);
        border: 1px solid transparent;
        min-height: var(--wk-control-h);
        padding: 0 calc(var(--wk-control-pad-x));
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--wk-space-2);
      }
      :host([animated]) button {
        transition:
          background var(--wk-ease),
          color var(--wk-ease),
          border-color var(--wk-ease),
          box-shadow var(--wk-ease),
          transform var(--wk-ease);
      }
      :host([animated]) button:hover:not(:disabled) {
        transform: translateY(calc(-1px * var(--wk-motion, 1)));
        box-shadow: var(--wk-shadow-sm);
      }
      :host([animated]) button:active:not(:disabled) {
        transform: translateY(0);
      }
      button:focus-visible {
        outline: none;
        box-shadow: var(--wk-focus);
      }
      :host([variant="primary"]) button {
        background: var(--wk-accent);
        color: var(--wk-accent-ink);
      }
      :host([variant="primary"]) button:hover:not(:disabled) {
        background: color-mix(in srgb, var(--wk-accent) 88%, var(--wk-ink));
      }
      :host([variant="secondary"]) button,
      :host(:not([variant])) button {
        background: var(--wk-surface);
        color: var(--wk-ink);
        border-color: var(--wk-border);
      }
      :host([variant="secondary"]) button:hover:not(:disabled),
      :host(:not([variant])) button:hover:not(:disabled) {
        border-color: color-mix(in srgb, var(--wk-accent) 35%, var(--wk-border));
        background: color-mix(in srgb, var(--wk-accent) 6%, var(--wk-surface));
      }
      :host([variant="ghost"]) button {
        background: transparent;
        color: var(--wk-ink);
      }
      :host([variant="ghost"]) button:hover:not(:disabled) {
        background: color-mix(in srgb, var(--wk-ink) 5%, transparent);
      }
      :host([icon-only]) button {
        padding: 0;
        width: var(--wk-control-h);
      }
      button:disabled {
        opacity: 0.55;
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
      }
      .label {
        display: inline-flex;
      }
    `,
  ];

  render() {
    const iconName = this.icon?.trim();
    const iconEl = iconName
      ? html`<wk-icon
          name=${iconName}
          size=${this.size === "lg" ? "md" : "sm"}
        ></wk-icon>`
      : null;
    return html`
      <button
        ?disabled=${this.disabled}
        type="button"
        aria-label=${this.iconOnly ? iconName || "Button" : nothing}
      >
        ${iconName && this.iconPosition !== "end" ? iconEl : null}
        ${this.iconOnly
          ? null
          : html`<span class="label"><slot></slot></span>`}
        ${iconName && this.iconPosition === "end" ? iconEl : null}
        ${!iconName ? html`<slot name="icon"></slot>` : null}
      </button>
    `;
  }
}

defineElement("wk-button", WkButton);

declare global {
  interface HTMLElementTagNameMap {
    "wk-button": WkButton;
  }
}
