import { html } from "lit";
import { cssText } from "../../../styles/css.js";
import wkStyles from "../../../styles/components/wk-divider.css";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";

export class WkDivider extends WkElement {
  static properties = {
    label: { type: String },
  };

  declare label: string;

  constructor() {
    super();
    this.label = "";
  }

  static styles = [
    WkElement.styles,
    cssText(wkStyles),
  ];

  render() {
    if (!this.label) {
      return html`<hr class="plain" />`;
    }
    return html`
      <div class="row" role="separator" aria-label=${this.label}>
        <hr />
        <span>${this.label}</span>
        <hr />
      </div>
    `;
  }
}

defineElement("wk-divider", WkDivider);

declare global {
  interface HTMLElementTagNameMap {
    "wk-divider": WkDivider;
  }
}
