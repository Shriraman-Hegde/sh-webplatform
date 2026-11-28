import { html } from "lit";
import { cssText } from "../../../styles/css.js";
import wkStyles from "../../../styles/components/wk-banner.css";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";

export class WkBanner extends WkElement {
  static properties = {
    tone: { type: String, reflect: true },
    heading: { type: String },
    dismissible: { type: Boolean, reflect: true },
    open: { type: Boolean, reflect: true },
  };

  declare tone: "info" | "success" | "warning" | "danger";
  declare heading: string;
  declare dismissible: boolean;
  declare open: boolean;

  constructor() {
    super();
    this.tone = "info";
    this.heading = "";
    this.dismissible = false;
    this.open = true;
  }

  static styles = [WkElement.styles, cssText(wkStyles)];

  private dismiss(): void {
    this.open = false;
    this.dispatchEvent(new CustomEvent("wk-close", { bubbles: true, composed: true }));
  }

  render() {
    if (!this.open) return html``;
    return html`
      <div part="banner" role=${this.tone === "danger" || this.tone === "warning" ? "alert" : "status"}>
        <div>
          ${this.heading ? html`<strong>${this.heading}</strong>` : null}
          <slot></slot>
        </div>
        ${this.dismissible ? html`<button type="button" aria-label="Dismiss" @click=${this.dismiss}>×</button>` : null}
      </div>
    `;
  }
}

defineElement("wk-banner", WkBanner);

declare global {
  interface HTMLElementTagNameMap {
    "wk-banner": WkBanner;
  }
}
