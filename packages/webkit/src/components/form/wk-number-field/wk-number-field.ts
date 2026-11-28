import { html } from "lit";
import { cssText } from "../../../styles/css.js";
import wkStyles from "../../../styles/components/wk-number-field.css";
import notes from "../../../styles/components/wk-field-notes.css";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";
import { describedBy, fieldChromeProperties, fieldNotes, initFieldChrome } from "../field-notes.js";

export class WkNumberField extends WkElement {
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
    this.min = Number.NEGATIVE_INFINITY;
    this.max = Number.POSITIVE_INFINITY;
    this.step = 1;
  }

  static styles = [WkElement.styles, cssText(wkStyles), cssText(notes)];

  private snap(next: number): number {
    const step = this.step;
    if (!Number.isFinite(step) || step <= 0) return next;
    const origin = Number.isFinite(this.min) ? this.min : 0;
    const snapped = origin + Math.round((next - origin) / step) * step;
    return Number(snapped.toPrecision(12));
  }

  private clamp(next: number): number {
    return Math.min(this.max, Math.max(this.min, this.snap(next)));
  }

  private commit(next: number, eventName: "wk-input" | "wk-change"): void {
    if (Number.isNaN(next)) return;
    this.value = this.clamp(next);
    this.dispatchEvent(
      new CustomEvent(eventName, {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private bump(direction: number): void {
    this.commit(this.value + direction * (this.step || 1), "wk-change");
  }

  render() {
    return html`
      <label>
        <span>${this.label}</span>
        <div class="row">
          <button type="button" part="decrement" aria-label="Decrease" ?disabled=${this.disabled} @click=${() => this.bump(-1)}>−</button>
          <input
            part="control"
            type="number"
            name=${this.name}
            .value=${String(this.value)}
            min=${Number.isFinite(this.min) ? String(this.min) : ""}
            max=${Number.isFinite(this.max) ? String(this.max) : ""}
            step=${String(this.step)}
            ?disabled=${this.disabled}
            aria-invalid=${this.error ? "true" : "false"}
            aria-describedby=${describedBy(this)}
            @input=${(event: Event) => this.commit(Number((event.target as HTMLInputElement).value), "wk-input")}
            @change=${(event: Event) => this.commit(Number((event.target as HTMLInputElement).value), "wk-change")}
          />
          <button type="button" part="increment" aria-label="Increase" ?disabled=${this.disabled} @click=${() => this.bump(1)}>+</button>
        </div>
        ${fieldNotes(this)}
      </label>
    `;
  }
}

defineElement("wk-number-field", WkNumberField);

declare global {
  interface HTMLElementTagNameMap {
    "wk-number-field": WkNumberField;
  }
}
