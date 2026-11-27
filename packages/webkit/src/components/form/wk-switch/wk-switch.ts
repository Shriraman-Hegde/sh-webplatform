import { html } from "lit";
import { cssText } from "../../../styles/css.js";
import wkStyles from "../../../styles/components/wk-switch.css";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";

export class WkSwitch extends WkElement {
  static properties = {
    label: { type: String },
    name: { type: String },
    checked: { type: Boolean, reflect: true },
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

  static styles = [
    WkElement.styles,
    cssText(wkStyles),
  ];

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
          role="switch"
          name=${this.name}
          .checked=${this.checked}
          ?disabled=${this.disabled}
          aria-checked=${this.checked ? "true" : "false"}
          @change=${this.onChange}
        />
        <span class="track" aria-hidden="true"
          ><span class="thumb"></span
        ></span>
        <span>${this.label}</span>
      </label>
    `;
  }
}

defineElement("wk-switch", WkSwitch);

declare global {
  interface HTMLElementTagNameMap {
    "wk-switch": WkSwitch;
  }
}
