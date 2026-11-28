import { html } from "lit";
import { cssText } from "../../../styles/css.js";
import wkStyles from "../../../styles/components/wk-sticky.css";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";

export class WkSticky extends WkElement {
  static properties = {
    offset: { type: String },
  };

  declare offset: string;

  constructor() {
    super();
    this.offset = "0px";
  }

  static styles = [WkElement.styles, cssText(wkStyles)];

  render() {
    return html`<div part="bar" style="top: ${this.offset}"><slot></slot></div>`;
  }
}

defineElement("wk-sticky", WkSticky);

declare global {
  interface HTMLElementTagNameMap {
    "wk-sticky": WkSticky;
  }
}
