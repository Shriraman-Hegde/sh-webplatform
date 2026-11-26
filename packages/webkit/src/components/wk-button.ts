import { LitElement, css, html } from "lit";

export class WkButton extends LitElement {
  static properties = {
    disabled: { type: Boolean, reflect: true },
    variant: { type: String, reflect: true },
  };

  declare disabled: boolean;
  declare variant: "primary" | "secondary";

  constructor() {
    super();
    this.disabled = false;
    this.variant = "primary";
  }

  static styles = css`
    :host {
      display: inline-block;
    }
    button {
      font: 600 0.95rem/1.2 var(--wk-font-sans);
      border-radius: var(--wk-radius);
      border: 1px solid transparent;
      padding: 0.55rem 1rem;
      cursor: pointer;
      transition: background 120ms ease, color 120ms ease, border-color 120ms ease;
    }
    button:focus-visible {
      outline: none;
      box-shadow: var(--wk-focus);
    }
    :host([variant="primary"]) button {
      background: var(--wk-accent);
      color: var(--wk-accent-ink);
    }
    :host([variant="secondary"]) button {
      background: var(--wk-surface);
      color: var(--wk-ink);
      border-color: var(--wk-border);
    }
    button:disabled {
      opacity: 0.55;
      cursor: not-allowed;
    }
  `;

  render() {
    return html`
      <button ?disabled=${this.disabled} type="button">
        <slot></slot>
      </button>
    `;
  }
}

customElements.define("wk-button", WkButton);

declare global {
  interface HTMLElementTagNameMap {
    "wk-button": WkButton;
  }
}
