import { html } from "lit";
import { cssText } from "../../../styles/css.js";
import wkStyles from "../../../styles/components/wk-code.css";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";

export class WkCode extends WkElement {
  static properties = {
    block: { type: Boolean, reflect: true },
  };

  declare block: boolean;

  constructor() {
    super();
    this.block = false;
  }

  static styles = [WkElement.styles, cssText(wkStyles)];

  render() {
    return this.block
      ? html`<pre part="block"><code><slot></slot></code></pre>`
      : html`<code part="code"><slot></slot></code>`;
  }
}

defineElement("wk-code", WkCode);

declare global {
  interface HTMLElementTagNameMap {
    "wk-code": WkCode;
  }
}
