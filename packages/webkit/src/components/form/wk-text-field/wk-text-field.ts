import { LitElement, css, html } from "lit";

export class WkTextField extends LitElement {
  static properties = {
    label: { type: String },
    name: { type: String },
    value: { type: String },
    disabled: { type: Boolean, reflect: true },
    error: { type: Boolean, reflect: true },
  };

  declare label: string;
  declare name: string;
  declare value: string;
  declare disabled: boolean;
  declare error: boolean;

  constructor() {
    super();
    this.label = "";
    this.name = "";
    this.value = "";
    this.disabled = false;
    this.error = false;
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
    input {
      font: inherit;
      padding: 0.6rem 0.75rem;
      border-radius: var(--wk-radius);
      border: 1px solid var(--wk-border);
      background: var(--wk-surface);
      color: var(--wk-ink);
    }
    input:focus-visible {
      outline: none;
      box-shadow: var(--wk-focus);
      border-color: var(--wk-accent);
    }
    :host([error]) input {
      border-color: var(--wk-danger);
    }
    input:disabled {
      opacity: 0.6;
    }
  `;

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
    return html`
      <label>
        <span>${this.label}</span>
        <input
          name=${this.name}
          .value=${this.value}
          ?disabled=${this.disabled}
          aria-invalid=${this.error ? "true" : "false"}
          @input=${this.onInput}
        />
      </label>
    `;
  }
}

customElements.define("wk-text-field", WkTextField);

declare global {
  interface HTMLElementTagNameMap {
    "wk-text-field": WkTextField;
  }
}
