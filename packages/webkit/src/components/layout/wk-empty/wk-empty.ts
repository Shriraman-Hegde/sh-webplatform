import { html } from "lit";
import { cssText } from "../../../styles/css.js";
import wkStyles from "../../../styles/components/wk-empty.css";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";
import "../wk-icon/index.js";

export class WkEmpty extends WkElement {
  static properties = {
    heading: { type: String },
    icon: { type: String },
  };

  declare heading: string;
  declare icon: string;

  constructor() {
    super();
    this.heading = "Nothing here";
    this.icon = "search";
  }

  static styles = [WkElement.styles, cssText(wkStyles)];

  render() {
    const icon = this.icon.trim();
    return html`
      <div>
        ${icon ? html`<wk-icon name=${icon} size="lg"></wk-icon>` : null}
        <h2>${this.heading}</h2>
        <div class="body"><slot></slot></div>
        <div class="actions"><slot name="actions"></slot></div>
      </div>
    `;
  }
}

defineElement("wk-empty", WkEmpty);

declare global {
  interface HTMLElementTagNameMap {
    "wk-empty": WkEmpty;
  }
}
