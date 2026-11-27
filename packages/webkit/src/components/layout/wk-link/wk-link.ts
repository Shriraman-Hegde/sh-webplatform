import { html, nothing } from "lit";
import { cssText } from "../../../styles/css.js";
import wkStyles from "../../../styles/components/wk-link.css";
import { ifDefined } from "lit/directives/if-defined.js";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";
import "../wk-icon/index.js";

export class WkLink extends WkElement {
  static properties = {
    href: { type: String },
    target: { type: String },
    disabled: { type: Boolean, reflect: true },
    size: { type: String, reflect: true },
    icon: { type: String },
    iconPosition: { type: String, attribute: "icon-position", reflect: true },
  };

  declare href: string;
  declare target: string;
  declare disabled: boolean;
  declare size: "sm" | "md" | "lg";
  declare icon: string;
  declare iconPosition: "start" | "end";

  constructor() {
    super();
    this.href = "#";
    this.target = "";
    this.disabled = false;
    this.size = "md";
    this.icon = "";
    this.iconPosition = "start";
  }

  static styles = [
    WkElement.styles,
    cssText(wkStyles),
  ];

  render() {
    const iconEl = this.icon
      ? html`<wk-icon name=${this.icon} size="sm"></wk-icon>`
      : null;
    return html`
      <a
        href=${this.disabled ? nothing : this.href}
        target=${ifDefined(this.target || undefined)}
        rel=${this.target === "_blank" ? "noopener noreferrer" : nothing}
        aria-disabled=${this.disabled ? "true" : "false"}
        tabindex=${this.disabled ? -1 : 0}
      >
        ${this.icon && this.iconPosition !== "end" ? iconEl : null}
        <slot></slot>
        ${this.icon && this.iconPosition === "end" ? iconEl : null}
      </a>
    `;
  }
}

defineElement("wk-link", WkLink);

declare global {
  interface HTMLElementTagNameMap {
    "wk-link": WkLink;
  }
}
