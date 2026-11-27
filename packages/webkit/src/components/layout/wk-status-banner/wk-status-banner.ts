import { html } from "lit";
import { cssText } from "../../../styles/css.js";
import wkStyles from "../../../styles/components/wk-status-banner.css";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";
import "../wk-icon/index.js";

const toneIcon: Record<string, string> = {
  empty: "info",
  loading: "settings",
  error: "error",
};

export class WkStatusBanner extends WkElement {
  static properties = {
    tone: { type: String, reflect: true },
    message: { type: String },
    size: { type: String, reflect: true },
    showIcon: { type: Boolean, attribute: "show-icon", reflect: true },
    animated: { type: Boolean, reflect: true },
  };

  declare tone: "empty" | "loading" | "error";
  declare message: string;
  declare size: "sm" | "md" | "lg";
  declare showIcon: boolean;
  declare animated: boolean;

  constructor() {
    super();
    this.tone = "empty";
    this.message = "";
    this.size = "md";
    this.showIcon = false;
    this.animated = true;
  }

  static styles = [
    WkElement.styles,
    cssText(wkStyles),
  ];

  render() {
    const fallback =
      this.tone === "loading"
        ? "Loading…"
        : this.tone === "error"
          ? "Something went wrong."
          : "Nothing to show yet.";
    const icon = this.showIcon ? (toneIcon[this.tone] ?? "info") : null;
    return html`<div class="banner" role="status">
      ${icon
        ? html`<span class="icon"
            ><wk-icon
              name=${icon}
              size=${this.size === "sm" ? "sm" : "md"}
            ></wk-icon
          ></span>`
        : null}
      <span>${this.message || fallback}</span>
    </div>`;
  }
}

defineElement("wk-status-banner", WkStatusBanner);

declare global {
  interface HTMLElementTagNameMap {
    "wk-status-banner": WkStatusBanner;
  }
}
