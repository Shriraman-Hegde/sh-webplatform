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
    size: { type: String, reflect: true },
    leadingIcon: { type: String, attribute: "leading-icon" },
    trailingIcon: { type: String, attribute: "trailing-icon" },
    placeholder: { type: String },
  };

  declare label: string;
  declare name: string;
  declare value: string;
  declare disabled: boolean;
  declare error: boolean;
  declare size: "sm" | "md" | "lg";
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
    this.size = "md";
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
      :host([size="sm"]) {
        --wk-control-h: var(--wk-control-h-sm);
        --wk-control-pad-x: var(--wk-control-pad-x-sm);
        --wk-control-font: var(--wk-text-sm);
      }
      :host([size="lg"]) {
        --wk-control-h: var(--wk-control-h-lg);
        --wk-control-pad-x: var(--wk-control-pad-x-lg);
        --wk-control-font: var(--wk-text-lg);
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
        font: var(--wk-control-font, var(--wk-text-md)) / 1.2 var(--wk-font-sans);
        width: 100%;
        min-height: var(--wk-control-h);
        padding: 0.45rem var(--wk-control-pad-x, 0.75rem);
        border-radius: var(--wk-radius);
        border: 1px solid var(--wk-border);
        background: var(--wk-surface);
        color: var(--wk-ink);
        transition:
          border-color var(--wk-ease),
          box-shadow var(--wk-ease);
      }
      .field:has(.lead) input {
        padding-left: 2.35rem;
      }
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
    const lead = this.leadingIcon?.trim();
    const trail = this.trailingIcon?.trim();
    const iconSize = this.size === "lg" ? "md" : "sm";
    return html`
      <label>
        <span>${this.label}</span>
        <div class="field">
          ${lead
            ? html`<span class="lead"
                ><wk-icon name=${lead} size=${iconSize}></wk-icon
              ></span>`
            : null}
          <input
            name=${this.name}
            .value=${this.value}
            placeholder=${this.placeholder}
            ?disabled=${this.disabled}
            @input=${this.onInput}
          />
          ${trail
            ? html`<span class="trail"
                ><wk-icon name=${trail} size=${iconSize}></wk-icon
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
