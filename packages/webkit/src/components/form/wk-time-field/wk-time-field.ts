import { html } from "lit";
import { cssText } from "../../../styles/css.js";
import wkStyles from "../../../styles/components/wk-time-field.css";
import notes from "../../../styles/components/wk-field-notes.css";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";
import { describedBy, fieldChromeProperties, fieldNotes, initFieldChrome } from "../field-notes.js";

export class WkTimeField extends WkElement {
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
    this.label = "";
    initFieldChrome(this);
    this.value = "";
  }

  static styles = [WkElement.styles, cssText(wkStyles), cssText(notes)];

  private commit(event: Event): void {
    this.value = (event.target as HTMLInputElement).value;
    this.dispatchEvent(
      new CustomEvent("wk-change", { detail: { value: this.value }, bubbles: true, composed: true }),
    );
  }

  render() {
    return html`
      <label>
        <span>${this.label}</span>
        <input
          part="control"
          type="time"
          name=${this.name}
          .value=${this.value}
          ?disabled=${this.disabled}
          aria-invalid=${this.error ? "true" : "false"}
          aria-describedby=${describedBy(this)}
          @change=${this.commit}
        />
        ${fieldNotes(this)}
      </label>
    `;
  }
}

defineElement("wk-time-field", WkTimeField);

declare global {
  interface HTMLElementTagNameMap {
    "wk-time-field": WkTimeField;
  }
}
