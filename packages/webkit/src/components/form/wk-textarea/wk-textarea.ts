import { css, html } from "lit";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";

export class WkTextarea extends WkElement {
  static properties = {
    label: { type: String },
    name: { type: String },
    value: { type: String },
    rows: { type: Number },
    disabled: { type: Boolean, reflect: true },
    error: { type: Boolean, reflect: true },
  };

  declare label: string;
  declare name: string;
  declare value: string;
  declare rows: number;
  declare disabled: boolean;
  declare error: boolean;

  constructor() {
    super();
    this.label = "";
    this.name = "";
    this.value = "";
    this.rows = 4;
    this.disabled = false;
    this.error = false;
  }

  static styles = [
    WkElement.styles,
    css`
      :host {
        display: block;
      }
      label {
        display: grid;
        gap: var(--wk-space-2);
        font-size: 0.9rem;
        font-weight: 600;
      }
      textarea {
        font: inherit;
        padding: 0.6rem 0.75rem;
        border-radius: var(--wk-radius);
        border: 1px solid var(--wk-border);
        background: var(--wk-surface);
        color: var(--wk-ink);
        resize: vertical;
        min-height: 5rem;
      }
      textarea:focus-visible {
        outline: none;
        box-shadow: var(--wk-focus);
        border-color: var(--wk-accent);
      }
      :host([error]) textarea {
        border-color: var(--wk-danger);
      }
      textarea:disabled {
        opacity: 0.6;
      }
    `,
  ];

  private onInput(e: Event) {
    const next = (e.target as HTMLTextAreaElement).value;
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
        <textarea
          name=${this.name}
          rows=${this.rows}
          .value=${this.value}
          ?disabled=${this.disabled}
          aria-invalid=${this.error ? "true" : "false"}
          @input=${this.onInput}
        ></textarea>
      </label>
    `;
  }
}

defineElement("wk-textarea", WkTextarea);

declare global {
  interface HTMLElementTagNameMap {
    "wk-textarea": WkTextarea;
  }
}
