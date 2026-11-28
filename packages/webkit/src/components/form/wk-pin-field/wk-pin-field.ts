import { html } from "lit";
import { cssText } from "../../../styles/css.js";
import wkStyles from "../../../styles/components/wk-pin-field.css";
import notes from "../../../styles/components/wk-field-notes.css";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";
import { describedBy, fieldChromeProperties, fieldNotes, initFieldChrome } from "../field-notes.js";

export class WkPinField extends WkElement {
  static properties = {
    label: { type: String },
    ...fieldChromeProperties,
    value: { type: String },
    length: { type: Number },
  };

  declare label: string;
  declare name: string;
  declare disabled: boolean;
  declare error: boolean;
  declare size: "sm" | "md" | "lg";
  declare hint: string;
  declare message: string;
  declare value: string;
  declare length: number;

  constructor() {
    super();
    initFieldChrome(this);
    this.label = "Code";
    this.value = "";
    this.length = 6;
  }

  static styles = [WkElement.styles, cssText(wkStyles), cssText(notes)];

  private boxes(): HTMLInputElement[] {
    return [...this.renderRoot.querySelectorAll("input[part=control]")] as HTMLInputElement[];
  }

  private write(next: string, emitChange: boolean): void {
    this.value = next.replace(/\s/g, "").slice(0, this.length);
    this.dispatchEvent(new CustomEvent("wk-input", { detail: { value: this.value }, bubbles: true, composed: true }));
    if (emitChange && this.value.length === this.length) {
      this.dispatchEvent(new CustomEvent("wk-change", { detail: { value: this.value }, bubbles: true, composed: true }));
    }
  }

  private onInput(index: number, event: Event): void {
    const input = event.target as HTMLInputElement;
    const char = input.value.replace(/\s/g, "").slice(-1);
    const chars = this.value.split("");
    chars[index] = char;
    this.write(chars.join(""), Boolean(char));
    if (char) this.boxes()[index + 1]?.focus();
  }

  private onKey(index: number, event: KeyboardEvent): void {
    if (event.key === "Backspace" && !this.value[index]) {
      this.boxes()[index - 1]?.focus();
    }
    if (event.key === "ArrowLeft") this.boxes()[index - 1]?.focus();
    if (event.key === "ArrowRight") this.boxes()[index + 1]?.focus();
  }

  private onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    this.write(event.clipboardData?.getData("text") ?? "", true);
    const last = Math.min(this.value.length, this.length - 1);
    this.boxes()[last]?.focus();
  }

  render() {
    const count = Math.max(1, this.length || 1);
    return html`
      <fieldset ?disabled=${this.disabled} aria-describedby=${describedBy(this)}>
        <legend>${this.label}</legend>
        <div class="boxes">
          ${Array.from({ length: count }, (_, index) => html`
            <input
              part="control"
              inputmode="numeric"
              maxlength="1"
              aria-label=${`${this.label} digit ${index + 1}`}
              .value=${this.value[index] ?? ""}
              ?disabled=${this.disabled}
              aria-invalid=${this.error ? "true" : "false"}
              @input=${(event: Event) => this.onInput(index, event)}
              @keydown=${(event: KeyboardEvent) => this.onKey(index, event)}
              @paste=${this.onPaste}
            />
          `)}
        </div>
      </fieldset>
      ${fieldNotes(this)}
      ${this.name ? html`<input type="hidden" name=${this.name} .value=${this.value} />` : null}
    `;
  }
}

defineElement("wk-pin-field", WkPinField);

declare global {
  interface HTMLElementTagNameMap {
    "wk-pin-field": WkPinField;
  }
}
