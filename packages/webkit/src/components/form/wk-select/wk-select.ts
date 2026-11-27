import { css, html } from "lit";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";
import "../../layout/wk-icon/index.js";

export type WkSelectOption = { value: string; label: string };

export class WkSelect extends WkElement {
  static properties = {
    label: { type: String },
    name: { type: String },
    value: { type: String },
    disabled: { type: Boolean, reflect: true },
    size: { type: String, reflect: true },
    options: { attribute: false },
    leadingIcon: { type: String, attribute: "leading-icon" },
  };

  declare label: string;
  declare name: string;
  declare value: string;
  declare disabled: boolean;
  declare size: "sm" | "md" | "lg";
  declare options: WkSelectOption[];
  declare leadingIcon: string;

  constructor() {
    super();
    this.label = "";
    this.name = "";
    this.value = "";
    this.disabled = false;
    this.size = "md";
    this.options = [];
    this.leadingIcon = "";
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
      .lead {
        position: absolute;
        left: 0.75rem;
        color: var(--wk-muted);
        display: inline-flex;
        pointer-events: none;
      }
      .chevron {
        position: absolute;
        right: 0.85rem;
        width: 0.45rem;
        height: 0.45rem;
        border-right: 2px solid var(--wk-muted);
        border-bottom: 2px solid var(--wk-muted);
        transform: rotate(45deg);
        pointer-events: none;
        margin-top: -0.15rem;
      }
      select {
        font: var(--wk-control-font, var(--wk-text-md)) / 1.2 var(--wk-font-sans);
        width: 100%;
        min-height: var(--wk-control-h);
        padding: 0.45rem 2.2rem 0.45rem var(--wk-control-pad-x, 0.75rem);
        border-radius: var(--wk-radius);
        border: 1px solid var(--wk-border);
        background: var(--wk-surface);
        color: var(--wk-ink);
        appearance: none;
        transition:
          border-color var(--wk-ease),
          box-shadow var(--wk-ease);
      }
      .field:has(.lead) select {
        padding-left: 2.35rem;
      }
      select:focus-visible {
        outline: none;
        box-shadow: var(--wk-focus);
        border-color: var(--wk-accent);
      }
    `,
  ];

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
    const lead = this.leadingIcon?.trim();
    return html`
      <label>
        <span>${this.label}</span>
        <div class="field">
          ${lead
            ? html`<span class="lead"
                ><wk-icon
                  name=${lead}
                  size=${this.size === "lg" ? "md" : "sm"}
                ></wk-icon
              ></span>`
            : null}
          <select
            name=${this.name}
            .value=${this.value}
            ?disabled=${this.disabled}
            @change=${this.onChange}
          >
            ${this.options.map(
              (opt) =>
                html`<option
                  value=${opt.value}
                  ?selected=${opt.value === this.value}
                >
                  ${opt.label}
                </option>`,
            )}
          </select>
          <span class="chevron" aria-hidden="true"></span>
        </div>
      </label>
    `;
  }
}

defineElement("wk-select", WkSelect);

declare global {
  interface HTMLElementTagNameMap {
    "wk-select": WkSelect;
  }
}
