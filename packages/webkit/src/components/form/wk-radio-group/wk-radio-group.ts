import { html } from "lit";
import { cssText } from "../../../styles/css.js";
import wkStyles from "../../../styles/components/wk-radio-group.css";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";

export type WkRadioOption = { value: string; label: string };

export class WkRadioGroup extends WkElement {
  static properties = {
    label: { type: String },
    name: { type: String },
    value: { type: String },
    disabled: { type: Boolean, reflect: true },
    options: { attribute: false },
  };

  declare label: string;
  declare name: string;
  declare value: string;
  declare disabled: boolean;
  declare options: WkRadioOption[];

  constructor() {
    super();
    this.label = "";
    this.name = "wk-radio";
    this.value = "";
    this.disabled = false;
    this.options = [];
  }

  static styles = [
    WkElement.styles,
    cssText(wkStyles),
  ];

  private onChange(e: Event) {
    const next = (e.target as HTMLInputElement).value;
    this.value = next;
    this.dispatchEvent(
      new CustomEvent("wk-change", {
        detail: { value: next },
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    return html`
      <fieldset ?disabled=${this.disabled}>
        ${this.label ? html`<legend>${this.label}</legend>` : null}
        ${this.options.map(
          (opt) => html`
            <label>
              <input
                type="radio"
                name=${this.name}
                value=${opt.value}
                .checked=${opt.value === this.value}
                ?disabled=${this.disabled}
                @change=${this.onChange}
              />
              <span>${opt.label}</span>
            </label>
          `,
        )}
      </fieldset>
    `;
  }
}

defineElement("wk-radio-group", WkRadioGroup);

declare global {
  interface HTMLElementTagNameMap {
    "wk-radio-group": WkRadioGroup;
  }
}
