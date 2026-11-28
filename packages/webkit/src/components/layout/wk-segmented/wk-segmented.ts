import { html } from "lit";
import { cssText } from "../../../styles/css.js";
import wkStyles from "../../../styles/components/wk-segmented.css";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";

export type WkSegment = { value: string; label: string };

export class WkSegmented extends WkElement {
  static properties = {
    label: { type: String },
    value: { type: String },
    options: { attribute: false },
    disabled: { type: Boolean, reflect: true },
  };

  declare label: string;
  declare value: string;
  declare options: WkSegment[];
  declare disabled: boolean;

  constructor() {
    super();
    this.label = "";
    this.value = "";
    this.options = [];
    this.disabled = false;
  }

  static styles = [WkElement.styles, cssText(wkStyles)];

  private onKey(event: KeyboardEvent): void {
    if (this.disabled || (event.key !== "ArrowRight" && event.key !== "ArrowLeft")) return;
    const index = this.options.findIndex((option) => option.value === this.value);
    const delta = event.key === "ArrowRight" ? 1 : -1;
    const next = this.options[(index + delta + this.options.length) % this.options.length];
    if (!next) return;
    event.preventDefault();
    this.choose(next.value);
  }

  private choose(value: string): void {
    this.value = value;
    this.dispatchEvent(new CustomEvent("wk-change", { detail: { value }, bubbles: true, composed: true }));
  }

  render() {
    return html`
      <div role="radiogroup" aria-label=${this.label} part="group" @keydown=${this.onKey}>
        ${this.options.map(
          (option) => html`
            <button
              type="button"
              role="radio"
              aria-checked=${option.value === this.value ? "true" : "false"}
              ?disabled=${this.disabled}
              @click=${() => this.choose(option.value)}
            >${option.label}</button>
          `,
        )}
      </div>
    `;
  }
}

defineElement("wk-segmented", WkSegmented);

declare global {
  interface HTMLElementTagNameMap {
    "wk-segmented": WkSegmented;
  }
}
