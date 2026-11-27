import { html } from "lit";
import { cssText } from "../../../styles/css.js";
import wkStyles from "../../../styles/components/wk-progress.css";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";

export class WkProgress extends WkElement {
  static properties = {
    value: { type: Number },
    max: { type: Number },
    label: { type: String },
  };

  declare value: number;
  declare max: number;
  declare label: string;

  constructor() {
    super();
    this.value = 0;
    this.max = 100;
    this.label = "";
  }

  static styles = [
    WkElement.styles,
    cssText(wkStyles),
  ];

  private get percent(): number {
    if (this.max <= 0) return 0;
    return Math.max(0, Math.min(100, (this.value / this.max) * 100));
  }

  render() {
    const pct = Math.round(this.percent);
    return html`
      <div class="meta">
        <span>${this.label}</span>
        <span>${pct}%</span>
      </div>
      <div
        class="track"
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax=${this.max}
        aria-valuenow=${this.value}
        aria-label=${this.label || "Progress"}
      >
        <div class="fill" style="width:${this.percent}%"></div>
      </div>
    `;
  }
}

defineElement("wk-progress", WkProgress);

declare global {
  interface HTMLElementTagNameMap {
    "wk-progress": WkProgress;
  }
}
