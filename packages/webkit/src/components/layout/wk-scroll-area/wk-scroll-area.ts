import { html } from "lit";
import { cssText } from "../../../styles/css.js";
import wkStyles from "../../../styles/components/wk-scroll-area.css";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";

export class WkScrollArea extends WkElement {
  static properties = {
    maxHeight: { type: String, attribute: "max-height" },
  };

  declare maxHeight: string;

  constructor() {
    super();
    this.maxHeight = "16rem";
  }

  static styles = [WkElement.styles, cssText(wkStyles)];

  render() {
    return html`<div part="viewport" style="max-height: ${this.maxHeight}"><slot></slot></div>`;
  }
}

defineElement("wk-scroll-area", WkScrollArea);

declare global {
  interface HTMLElementTagNameMap {
    "wk-scroll-area": WkScrollArea;
  }
}
