import { html } from "lit";
import { cssText } from "../../../styles/css.js";
import wkStyles from "../../../styles/components/wk-password-field.css";
import notes from "../../../styles/components/wk-field-notes.css";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";
import "../../layout/wk-icon/index.js";
import { describedBy, fieldChromeProperties, fieldNotes, initFieldChrome } from "../field-notes.js";

export class WkPasswordField extends WkElement {
  static properties = {
    label: { type: String },
    ...fieldChromeProperties,
    value: { type: String },
    revealed: { type: Boolean, reflect: true },
  };

  declare label: string;
  declare name: string;
  declare disabled: boolean;
  declare error: boolean;
  declare size: "sm" | "md" | "lg";
  declare hint: string;
  declare message: string;
  declare value: string;
  declare revealed: boolean;

  constructor() {
    super();
    this.label = "";
    initFieldChrome(this);
    this.value = "";
    this.revealed = false;
  }

  static styles = [WkElement.styles, cssText(wkStyles), cssText(notes)];

  private onInput(event: Event): void {
    this.value = (event.target as HTMLInputElement).value;
    this.dispatchEvent(
      new CustomEvent("wk-input", {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    return html`
      <label>
        <span>${this.label}</span>
        <div class="field">
          <input
            part="control"
            type=${this.revealed ? "text" : "password"}
            name=${this.name}
            .value=${this.value}
            ?disabled=${this.disabled}
            aria-invalid=${this.error ? "true" : "false"}
            aria-describedby=${describedBy(this)}
            @input=${this.onInput}
          />
          <button
            type="button"
            class="reveal"
            part="reveal"
            aria-label=${this.revealed ? "Hide password" : "Show password"}
            ?disabled=${this.disabled}
            @click=${() => {
              this.revealed = !this.revealed;
            }}
          >
            <wk-icon name=${this.revealed ? "eye-off" : "eye"} size="sm"></wk-icon>
          </button>
        </div>
        ${fieldNotes(this)}
      </label>
    `;
  }
}

defineElement("wk-password-field", WkPasswordField);

declare global {
  interface HTMLElementTagNameMap {
    "wk-password-field": WkPasswordField;
  }
}
