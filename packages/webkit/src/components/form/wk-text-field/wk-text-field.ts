import { html } from "lit";
import { cssText } from "../../../styles/css.js";
import wkStyles from "../../../styles/components/wk-text-field.css";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";
import "../../layout/wk-icon/index.js";

export class WkTextField extends WkElement {
  static properties = {
    label: { type: String },
    name: { type: String },
    value: { type: String },
    disabled: { type: Boolean, reflect: true },
    error: { type: Boolean, reflect: true },
    size: { type: String, reflect: true },
    leadingIcon: { type: String, attribute: "leading-icon" },
    trailingIcon: { type: String, attribute: "trailing-icon" },
    placeholder: { type: String },
  };

  declare label: string;
  declare name: string;
  declare value: string;
  declare disabled: boolean;
  declare error: boolean;
  declare size: "sm" | "md" | "lg";
  declare leadingIcon: string;
  declare trailingIcon: string;
  declare placeholder: string;

  constructor() {
    super();
    this.label = "";
    this.name = "";
    this.value = "";
    this.disabled = false;
    this.error = false;
    this.size = "md";
    this.leadingIcon = "";
    this.trailingIcon = "";
    this.placeholder = "";
  }

  static styles = [
    WkElement.styles,
    cssText(wkStyles),
  ];

  private onInput(e: Event) {
    const next = (e.target as HTMLInputElement).value;
    this.value = next;
    this.dispatchEvent(
      new CustomEvent("wk-input", {
        detail: { value: next },
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    const lead = this.leadingIcon?.trim();
    const trail = this.trailingIcon?.trim();
    const iconSize = this.size === "lg" ? "md" : "sm";
    return html`
      <label>
        <span>${this.label}</span>
        <div class="field">
          ${lead
            ? html`<span class="lead"
                ><wk-icon name=${lead} size=${iconSize}></wk-icon
              ></span>`
            : null}
          <input
            name=${this.name}
            .value=${this.value}
            placeholder=${this.placeholder}
            ?disabled=${this.disabled}
            @input=${this.onInput}
          />
          ${trail
            ? html`<span class="trail"
                ><wk-icon name=${trail} size=${iconSize}></wk-icon
              ></span>`
            : null}
        </div>
      </label>
    `;
  }
}

defineElement("wk-text-field", WkTextField);

declare global {
  interface HTMLElementTagNameMap {
    "wk-text-field": WkTextField;
  }
}
