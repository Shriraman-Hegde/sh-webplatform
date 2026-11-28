import { html } from "lit";
import { cssText } from "../../../styles/css.js";
import wkStyles from "../../../styles/components/wk-color-field.css";
import notes from "../../../styles/components/wk-field-notes.css";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";
import { describedBy, fieldChromeProperties, fieldNotes, initFieldChrome } from "../field-notes.js";

export class WkColorField extends WkElement {
  static properties = {
    label: { type: String },
    ...fieldChromeProperties,
    value: { type: String },
  };

  declare label: string;
  declare name: string;
  declare disabled: boolean;
  declare error: boolean;
  declare size: "sm" | "md" | "lg";
  declare hint: string;
  declare message: string;
  declare value: string;

  constructor() {
    super();
    initFieldChrome(this);
    this.label = "Color";
    this.value = "#0b6e99";
  }

  static styles = [WkElement.styles, cssText(wkStyles), cssText(notes)];

  private commit(next: string): void {
    this.value = next;
    this.dispatchEvent(new CustomEvent("wk-change", { detail: { value: next }, bubbles: true, composed: true }));
  }

  render() {
    return html`
      <label>
        <span>${this.label}</span>
        <div class="row">
          <input part="swatch" type="color" .value=${this.value} ?disabled=${this.disabled} aria-label=${`${this.label} picker`} @input=${(event: Event) => this.commit((event.target as HTMLInputElement).value)} />
          <input part="control" type="text" name=${this.name} .value=${this.value} ?disabled=${this.disabled} aria-invalid=${this.error ? "true" : "false"} aria-describedby=${describedBy(this)} @change=${(event: Event) => this.commit((event.target as HTMLInputElement).value)} />
        </div>
        ${fieldNotes(this)}
      </label>
    `;
  }
}

defineElement("wk-color-field", WkColorField);

declare global {
  interface HTMLElementTagNameMap {
    "wk-color-field": WkColorField;
  }
}
