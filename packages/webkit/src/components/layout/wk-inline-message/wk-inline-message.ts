import { html } from "lit";
import { cssText } from "../../../styles/css.js";
import wkStyles from "../../../styles/components/wk-inline-message.css";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";

export class WkInlineMessage extends WkElement {
  static properties = {
    tone: { type: String, reflect: true },
  };

  declare tone: "info" | "success" | "warning" | "danger";

  constructor() {
    super();
    this.tone = "info";
  }

  static styles = [WkElement.styles, cssText(wkStyles)];

  render() {
    return html`<p part="message" role=${this.tone === "danger" ? "alert" : "status"}><slot></slot></p>`;
  }
}

defineElement("wk-inline-message", WkInlineMessage);

declare global {
  interface HTMLElementTagNameMap {
    "wk-inline-message": WkInlineMessage;
  }
}
