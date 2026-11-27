import { css, html } from "lit";
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
    css`
      :host {
        display: block;
      }
      fieldset {
        margin: 0;
        border: 0;
        padding: 0;
        display: grid;
        gap: var(--wk-space-2);
      }
      legend {
        font-size: 0.9rem;
        font-weight: 600;
        margin-bottom: var(--wk-space-1);
        padding: 0;
      }
      label {
        display: inline-flex;
        align-items: center;
        gap: var(--wk-space-2);
        font-size: 0.95rem;
      }
      input {
        accent-color: var(--wk-accent);
        width: 1.05rem;
        height: 1.05rem;
      }
      input:focus-visible {
        outline: none;
        box-shadow: var(--wk-focus);
      }
    `,
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
