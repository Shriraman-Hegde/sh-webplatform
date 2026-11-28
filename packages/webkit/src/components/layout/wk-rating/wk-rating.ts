import { html } from "lit";
import { cssText } from "../../../styles/css.js";
import wkStyles from "../../../styles/components/wk-rating.css";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";

export class WkRating extends WkElement {
  static properties = {
    label: { type: String },
    value: { type: Number },
    max: { type: Number },
    readonly: { type: Boolean, reflect: true },
  };

  declare label: string;
  declare value: number;
  declare max: number;
  declare readonly: boolean;

  constructor() {
    super();
    this.label = "Rating";
    this.value = 0;
    this.max = 5;
    this.readonly = false;
  }

  static styles = [WkElement.styles, cssText(wkStyles)];

  private onKey(event: KeyboardEvent): void {
    if (this.readonly) return;
    const delta = event.key === "ArrowRight" || event.key === "ArrowUp" ? 1 : event.key === "ArrowLeft" || event.key === "ArrowDown" ? -1 : 0;
    if (!delta) return;
    event.preventDefault();
    this.choose(Math.min(this.max, Math.max(1, this.value + delta)));
  }

  private choose(value: number): void {
    if (this.readonly) return;
    this.value = value;
    this.dispatchEvent(new CustomEvent("wk-change", { detail: { value }, bubbles: true, composed: true }));
  }

  render() {
    const count = Math.max(1, this.max);
    return html`
      <div role="radiogroup" aria-label=${this.label} part="group" @keydown=${this.onKey}>
        ${Array.from({ length: count }, (_, index) => {
          const score = index + 1;
          return html`<button type="button" role="radio" aria-label=${`${score} of ${count}`} aria-checked=${score === this.value ? "true" : "false"} ?disabled=${this.readonly} data-on=${score <= this.value ? "true" : "false"} @click=${() => this.choose(score)}>★</button>`;
        })}
      </div>
    `;
  }
}

defineElement("wk-rating", WkRating);

declare global {
  interface HTMLElementTagNameMap {
    "wk-rating": WkRating;
  }
}
