import { html } from "lit";
import { cssText } from "../../../styles/css.js";
import wkStyles from "../../../styles/components/wk-slider.css";
import notes from "../../../styles/components/wk-field-notes.css";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";
import { describedBy, fieldChromeProperties, fieldNotes, initFieldChrome } from "../field-notes.js";

export class WkSlider extends WkElement {
  static properties = {
    label: { type: String },
    ...fieldChromeProperties,
    value: { type: Number },
    min: { type: Number },
    max: { type: Number },
    step: { type: Number },
  };

  declare label: string;
  declare name: string;
  declare disabled: boolean;
  declare error: boolean;
  declare size: "sm" | "md" | "lg";
  declare hint: string;
  declare message: string;
  declare value: number;
  declare min: number;
  declare max: number;
  declare step: number;

  constructor() {
    super();
    this.label = "";
    initFieldChrome(this);
    this.value = 0;
    this.min = 0;
    this.max = 100;
    this.step = 1;
  }

  static styles = [WkElement.styles, cssText(wkStyles), cssText(notes)];

  private commit(next: number, name: "wk-input" | "wk-change"): void {
    this.value = next;
    this.dispatchEvent(new CustomEvent(name, { detail: { value: next }, bubbles: true, composed: true }));
  }

  render() {
    return html`
      <label>
        <span>${this.label}</span>
        <span class="value" part="value">${this.value}</span>
        <input
          part="control"
          type="range"
          name=${this.name}
          min=${String(this.min)}
          max=${String(this.max)}
          step=${String(this.step)}
          .value=${String(this.value)}
          ?disabled=${this.disabled}
          aria-invalid=${this.error ? "true" : "false"}
          aria-describedby=${describedBy(this)}
          @input=${(event: Event) => this.commit(Number((event.target as HTMLInputElement).value), "wk-input")}
          @change=${(event: Event) => this.commit(Number((event.target as HTMLInputElement).value), "wk-change")}
        />
        ${fieldNotes(this)}
      </label>
    `;
  }
}

defineElement("wk-slider", WkSlider);

declare global {
  interface HTMLElementTagNameMap {
    "wk-slider": WkSlider;
  }
}
