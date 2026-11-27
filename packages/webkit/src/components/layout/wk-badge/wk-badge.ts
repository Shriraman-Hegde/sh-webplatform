import { html } from "lit";
import { cssText } from "../../../styles/css.js";
import wkStyles from "../../../styles/components/wk-badge.css";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";
import "../wk-icon/index.js";

export class WkBadge extends WkElement {
  static properties = {
    tone: { type: String, reflect: true },
    size: { type: String, reflect: true },
    icon: { type: String },
  };

  declare tone: "neutral" | "accent" | "success" | "danger";
  declare size: "sm" | "md" | "lg";
  declare icon: string;

  constructor() {
    super();
    this.tone = "neutral";
    this.size = "md";
    this.icon = "";
  }

  static styles = [
    WkElement.styles,
    cssText(wkStyles),
  ];

  render() {
    const icon = this.icon?.trim();
    return html`<span>
      ${icon
        ? html`<wk-icon
            name=${icon}
            size=${this.size === "lg" ? "md" : "sm"}
          ></wk-icon>`
        : null}
      <slot></slot>
    </span>`;
  }
}

defineElement("wk-badge", WkBadge);

declare global {
  interface HTMLElementTagNameMap {
    "wk-badge": WkBadge;
  }
}
