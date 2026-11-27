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
    options: { attribute: false },
    leadingIcon: { type: String, attribute: "leading-icon" },
  };

  declare label: string;
  declare name: string;
  declare value: string;
  declare disabled: boolean;
  declare options: WkSelectOption[];
  declare leadingIcon: string;

  constructor() {
    super();
    this.label = "";
    this.name = "";
    this.value = "";
    this.disabled = false;
    this.options = [];
    this.leadingIcon = "";
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
      .chevron {
        position: absolute;
        color: var(--wk-muted);
        display: inline-flex;
        pointer-events: none;
      }
      .lead {
        left: 0.75rem;
      }
      .chevron {
        right: 0.75rem;
      }
      select {
        font: inherit;
        width: 100%;
        min-height: var(--wk-control-h);
        padding: 0.6rem 2.35rem 0.6rem 0.75rem;
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
    return html`
      <label>
        <span>${this.label}</span>
        <div class="field">
          ${this.leadingIcon
            ? html`<span class="lead"
                ><wk-icon name=${this.leadingIcon} size="sm"></wk-icon
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
          <span class="chevron"
            ><wk-icon name="chevron-down" size="sm"></wk-icon
          ></span>
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
