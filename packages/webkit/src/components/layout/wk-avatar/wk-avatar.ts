import { html } from "lit";
import { cssText } from "../../../styles/css.js";
import wkStyles from "../../../styles/components/wk-avatar.css";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";

export class WkAvatar extends WkElement {
  static properties = {
    label: { type: String },
    src: { type: String },
    size: { type: String, reflect: true },
  };

  declare label: string;
  declare src: string;
  declare size: "sm" | "md" | "lg";

  constructor() {
    super();
    this.label = "";
    this.src = "";
    this.size = "md";
  }

  static styles = [WkElement.styles, cssText(wkStyles)];

  private get initials(): string {
    const parts = this.label.trim().split(/\s+/).filter(Boolean);
    return parts
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("");
  }

  render() {
    const src = this.src.trim();
    return html`
      <span role="img" aria-label=${this.label || "Avatar"}>
        ${src
          ? html`<img src=${src} alt="" />`
          : html`<span class="initials">${this.initials}</span>`}
      </span>
    `;
  }
}

defineElement("wk-avatar", WkAvatar);

declare global {
  interface HTMLElementTagNameMap {
    "wk-avatar": WkAvatar;
  }
}
