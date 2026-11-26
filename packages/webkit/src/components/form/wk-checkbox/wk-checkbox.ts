import { LitElement, css, html } from "lit";

export class WkCheckbox extends LitElement {
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

  static styles = css`
    :host {
      display: block;
      font-family: var(--wk-font-sans);
      color: var(--wk-ink);
    }
    label {
      display: inline-flex;
      align-items: center;
      gap: var(--wk-space-2);
      font-size: 0.95rem;
    }
    input {
      width: 1.05rem;
      height: 1.05rem;
      accent-color: var(--wk-accent);
    }
    input:focus-visible {
      outline: none;
      box-shadow: var(--wk-focus);
    }
  `;

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

customElements.define("wk-checkbox", WkCheckbox);

declare global {
  interface HTMLElementTagNameMap {
    "wk-checkbox": WkCheckbox;
  }
}
