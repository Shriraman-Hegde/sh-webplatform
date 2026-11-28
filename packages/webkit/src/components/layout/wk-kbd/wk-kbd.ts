import { html } from "lit";
import { cssText } from "../../../styles/css.js";
import wkStyles from "../../../styles/components/wk-kbd.css";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";

export class WkKbd extends WkElement {
  static styles = [WkElement.styles, cssText(wkStyles)];

  render() {
    return html`<kbd part="key"><slot></slot></kbd>`;
  }
}

defineElement("wk-kbd", WkKbd);

declare global {
  interface HTMLElementTagNameMap {
    "wk-kbd": WkKbd;
  }
}
