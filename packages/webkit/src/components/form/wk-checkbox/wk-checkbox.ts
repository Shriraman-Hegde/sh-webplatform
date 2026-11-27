import { html } from "lit";
import { cssText } from "../../../styles/css.js";
import wkStyles from "../../../styles/components/wk-checkbox.css";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";

export class WkCheckbox extends WkElement {
  static properties = {
    label: { type: String },
    name: { type: String },
    checked: { type: Boolean },
    disabled: { type: Boolean, reflect: true },
  };

  declare label: string;
  declare name: string;
  declare checked: boolean;
  declare disabled: boolean;

  constructor() {
    super();
    this.label = "";
    this.name = "";
    this.checked = false;
    this.disabled = false;
  }

  static styles = [WkElement.styles, cssText(wkStyles)];

  private onChange(e: Event) {
    this.checked = (e.target as HTMLInputElement).checked;
    this.dispatchEvent(
      new CustomEvent("wk-change", {
        detail: { checked: this.checked },
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    return html`
      <label>
        <input
          type="checkbox"
          name=${this.name}
          .checked=${this.checked}
          ?disabled=${this.disabled}
          @change=${this.onChange}
        />
        <span>${this.label}</span>
      </label>
    `;
  }
}

defineElement("wk-checkbox", WkCheckbox);

declare global {
  interface HTMLElementTagNameMap {
    "wk-checkbox": WkCheckbox;
  }
}
