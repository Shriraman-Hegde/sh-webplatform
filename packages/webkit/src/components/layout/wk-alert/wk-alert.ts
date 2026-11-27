import { html } from "lit";
import { cssText } from "../../../styles/css.js";
import wkStyles from "../../../styles/components/wk-alert.css";
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
    cssText(wkStyles),
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
