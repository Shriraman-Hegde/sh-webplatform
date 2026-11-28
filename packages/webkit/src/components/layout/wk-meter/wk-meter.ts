import { html } from "lit";
import { cssText } from "../../../styles/css.js";
import wkStyles from "../../../styles/components/wk-meter.css";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";

export class WkMeter extends WkElement {
  static properties = {
    label: { type: String },
    value: { type: Number },
    min: { type: Number },
    max: { type: Number },
    low: { type: Number },
    high: { type: Number },
  };

  declare label: string;
  declare value: number;
  declare min: number;
  declare max: number;
  declare low: number;
  declare high: number;

  constructor() {
    super();
    this.label = "";
    this.value = 0;
    this.min = 0;
    this.max = 100;
    this.low = 30;
    this.high = 70;
  }

  static styles = [WkElement.styles, cssText(wkStyles)];

  render() {
    const span = this.max - this.min || 1;
    const percent = Math.min(100, Math.max(0, ((this.value - this.min) / span) * 100));
    const tone = this.value <= this.low ? "low" : this.value >= this.high ? "high" : "mid";
    return html`
      <div>
        <span>${this.label}</span>
        <div part="track" role="meter" aria-label=${this.label} aria-valuemin=${String(this.min)} aria-valuemax=${String(this.max)} aria-valuenow=${String(this.value)} data-tone=${tone}>
          <span style="width: ${percent}%"></span>
        </div>
      </div>
    `;
  }
}

defineElement("wk-meter", WkMeter);

declare global {
  interface HTMLElementTagNameMap {
    "wk-meter": WkMeter;
  }
}
