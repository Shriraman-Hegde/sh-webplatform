import { LitElement, css, html } from "lit";

export type WkSelectOption = { value: string; label: string };

export class WkSelect extends LitElement {
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
  declare options: WkSelectOption[];

  constructor() {
    super();
    this.label = "";
    this.name = "";
    this.value = "";
    this.disabled = false;
    this.options = [];
  }

  static styles = css`
    :host {
      display: block;
      font-family: var(--wk-font-sans);
      color: var(--wk-ink);
    }
    label {
      display: grid;
      gap: var(--wk-space-2);
      font-size: 0.9rem;
      font-weight: 600;
    }
    select {
      font: inherit;
      padding: 0.6rem 0.75rem;
      border-radius: var(--wk-radius);
      border: 1px solid var(--wk-border);
      background: var(--wk-surface);
      color: var(--wk-ink);
    }
    select:focus-visible {
      outline: none;
      box-shadow: var(--wk-focus);
      border-color: var(--wk-accent);
    }
  `;

  private onChange(e: Event) {
    const next = (e.target as HTMLSelectElement).value;
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
      <label>
        <span>${this.label}</span>
        <select
          name=${this.name}
          .value=${this.value}
          ?disabled=${this.disabled}
          @change=${this.onChange}
        >
          ${this.options.map(
            (opt) =>
              html`<option value=${opt.value} ?selected=${opt.value === this.value}>
                ${opt.label}
              </option>`,
          )}
        </select>
      </label>
    `;
  }
}

customElements.define("wk-select", WkSelect);

declare global {
  interface HTMLElementTagNameMap {
    "wk-select": WkSelect;
  }
}
