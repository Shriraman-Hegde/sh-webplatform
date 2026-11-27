import { html, nothing } from "lit";
import { cssText } from "../../../styles/css.js";
import wkStyles from "../../../styles/components/wk-button.css";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";
import "../../layout/wk-icon/index.js";

export class WkButton extends WkElement {
  static shadowRootOptions = { mode: "open" as const, delegatesFocus: true };

  static properties = {
    disabled: { type: Boolean, reflect: true },
    loading: { type: Boolean, reflect: true },
    variant: { type: String, reflect: true },
    size: { type: String, reflect: true },
    icon: { type: String },
    iconPosition: { type: String, attribute: "icon-position", reflect: true },
    iconOnly: { type: Boolean, attribute: "icon-only", reflect: true },
    animated: { type: Boolean, reflect: true },
  };

  declare disabled: boolean;
  declare loading: boolean;
  declare variant: "primary" | "secondary" | "ghost";
  declare size: "sm" | "md" | "lg";
  declare icon: string;
  declare iconPosition: "start" | "end";
  declare iconOnly: boolean;
  declare animated: boolean;

  constructor() {
    super();
    this.disabled = false;
    this.loading = false;
    this.variant = "primary";
    this.size = "md";
    this.icon = "";
    this.iconPosition = "start";
    this.iconOnly = false;
    this.animated = true;
  }

  static styles = [
    WkElement.styles,
    cssText(wkStyles),
  ];

  protected willUpdate(changed: Map<string, unknown>): void {
    if (changed.has("loading") || !this.hasUpdated) {
      if (this.loading) this.setAttribute("aria-busy", "true");
      else this.removeAttribute("aria-busy");
    }
  }

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
        part="control"
        ?disabled=${this.disabled || this.loading}
        type="button"
        aria-label=${this.iconOnly ? iconName || "Button" : nothing}
      >
        ${this.loading ? html`<span class="ring" aria-hidden="true"></span>` : null}
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
