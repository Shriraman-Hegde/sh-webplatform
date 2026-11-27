import { css, html } from "lit";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";
import "../../layout/wk-icon/index.js";

export class WkTextField extends WkElement {
  static properties = {
    label: { type: String },
    name: { type: String },
    value: { type: String },
    disabled: { type: Boolean, reflect: true },
    error: { type: Boolean, reflect: true },
    leadingIcon: { type: String, attribute: "leading-icon" },
    trailingIcon: { type: String, attribute: "trailing-icon" },
    placeholder: { type: String },
  };

  declare label: string;
  declare name: string;
  declare value: string;
  declare disabled: boolean;
  declare error: boolean;
  declare leadingIcon: string;
  declare trailingIcon: string;
  declare placeholder: string;

  constructor() {
    super();
    this.label = "";
    this.name = "";
    this.value = "";
    this.disabled = false;
    this.error = false;
    this.leadingIcon = "";
    this.trailingIcon = "";
    this.placeholder = "";
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
        font-size: var(--wk-text-sm);
        font-weight: 600;
      }
      .field {
        position: relative;
        display: flex;
        align-items: center;
      }
      .lead,
      .trail {
        position: absolute;
        color: var(--wk-muted);
        display: inline-flex;
        pointer-events: none;
      }
      .lead {
        left: 0.75rem;
      }
      .trail {
        right: 0.75rem;
      }
      input {
        font: inherit;
        width: 100%;
        min-height: var(--wk-control-h);
        padding: 0.6rem 0.75rem;
        border-radius: var(--wk-radius);
        border: 1px solid var(--wk-border);
        background: var(--wk-surface);
        color: var(--wk-ink);
        transition:
          border-color var(--wk-ease),
          box-shadow var(--wk-ease);
      }
      :host([leading-icon]) input,
      .field:has(.lead) input {
        padding-left: 2.35rem;
      }
      :host([trailing-icon]) input,
      .field:has(.trail) input {
        padding-right: 2.35rem;
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
    `,
  ];

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
        <div class="field">
          ${this.leadingIcon
            ? html`<span class="lead"
                ><wk-icon name=${this.leadingIcon} size="sm"></wk-icon
              ></span>`
            : null}
          <input
            name=${this.name}
            .value=${this.value}
            placeholder=${this.placeholder}
            ?disabled=${this.disabled}
            @input=${this.onInput}
          />
          ${this.trailingIcon
            ? html`<span class="trail"
                ><wk-icon name=${this.trailingIcon} size="sm"></wk-icon
              ></span>`
            : null}
        </div>
      </label>
    `;
  }
}

defineElement("wk-text-field", WkTextField);

declare global {
  interface HTMLElementTagNameMap {
    "wk-text-field": WkTextField;
  }
}
