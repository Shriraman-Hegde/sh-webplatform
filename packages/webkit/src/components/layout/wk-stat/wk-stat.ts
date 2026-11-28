import { html } from "lit";
import { cssText } from "../../../styles/css.js";
import wkStyles from "../../../styles/components/wk-stat.css";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";

export class WkStat extends WkElement {
  static properties = {
    label: { type: String },
    value: { type: String },
    change: { type: String },
    trend: { type: String, reflect: true },
  };

  declare label: string;
  declare value: string;
  declare change: string;
  declare trend: "up" | "down" | "flat";

  constructor() {
    super();
    this.label = "";
    this.value = "";
    this.change = "";
    this.trend = "flat";
  }

  static styles = [WkElement.styles, cssText(wkStyles)];

  render() {
    return html`
      <div part="stat">
        <span class="label">${this.label}</span>
        <strong>${this.value}</strong>
        ${this.change ? html`<span class="change">${this.change}</span>` : null}
      </div>
    `;
  }
}

defineElement("wk-stat", WkStat);

declare global {
  interface HTMLElementTagNameMap {
    "wk-stat": WkStat;
  }
}
