import { html } from "lit";
import { cssText } from "../../../styles/css.js";
import wkStyles from "../../../styles/components/wk-search-field.css";
import notes from "../../../styles/components/wk-field-notes.css";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";
import "../../layout/wk-icon/index.js";
import { describedBy, fieldChromeProperties, fieldNotes, initFieldChrome } from "../field-notes.js";

export class WkSearchField extends WkElement {
  static properties = {
    label: { type: String },
    ...fieldChromeProperties,
    value: { type: String },
    placeholder: { type: String },
  };

  declare label: string;
  declare name: string;
  declare disabled: boolean;
  declare error: boolean;
  declare size: "sm" | "md" | "lg";
  declare hint: string;
  declare message: string;
  declare value: string;
  declare placeholder: string;

  constructor() {
    super();
    initFieldChrome(this);
    this.label = "Search";
    this.value = "";
    this.placeholder = "Search";
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

  private submitSearch(event: Event): void {
    event.preventDefault();
    this.dispatchEvent(
      new CustomEvent("wk-search", {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    return html`
      <form role="search" @submit=${this.submitSearch}>
        <label>
          <span class="label">${this.label}</span>
          <div class="row">
            <wk-icon name="search" size="sm"></wk-icon>
            <input
              part="control"
              type="search"
              name=${this.name}
              .value=${this.value}
              placeholder=${this.placeholder}
              ?disabled=${this.disabled}
              aria-invalid=${this.error ? "true" : "false"}
              aria-describedby=${describedBy(this)}
              @input=${this.onInput}
            />
          </div>
        </label>
        ${fieldNotes(this)}
      </form>
    `;
  }
}

defineElement("wk-search-field", WkSearchField);

declare global {
  interface HTMLElementTagNameMap {
    "wk-search-field": WkSearchField;
  }
}
