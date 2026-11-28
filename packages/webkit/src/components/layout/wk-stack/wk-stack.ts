import { html } from "lit";
import { cssText } from "../../../styles/css.js";
import wkStyles from "../../../styles/components/wk-stack.css";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";

export class WkStack extends WkElement {
  static properties = {
    orientation: { type: String, reflect: true },
    gap: { type: String, reflect: true },
  };

  declare orientation: "vertical" | "horizontal";
  declare gap: "sm" | "md" | "lg";

  constructor() {
    super();
    this.orientation = "vertical";
    this.gap = "md";
  }

  static styles = [WkElement.styles, cssText(wkStyles)];

  render() {
    return html`<div part="stack"><slot></slot></div>`;
  }
}

defineElement("wk-stack", WkStack);

declare global {
  interface HTMLElementTagNameMap {
    "wk-stack": WkStack;
  }
}
