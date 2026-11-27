import { css, html } from "lit";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";

export class WkSwitch extends WkElement {
  static properties = {
    label: { type: String },
    name: { type: String },
    checked: { type: Boolean, reflect: true },
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

  static styles = [
    WkElement.styles,
    css`
      :host {
        display: inline-block;
      }
      label {
        display: inline-flex;
        align-items: center;
        gap: var(--wk-space-3);
        font-size: 0.95rem;
        cursor: pointer;
      }
      input {
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;
      }
      .track {
        width: 2.6rem;
        height: 1.45rem;
        border-radius: 999px;
        background: var(--wk-border);
        position: relative;
        transition: background 120ms ease;
        flex-shrink: 0;
      }
      .thumb {
        position: absolute;
        top: 0.15rem;
        left: 0.15rem;
        width: 1.15rem;
        height: 1.15rem;
        border-radius: 50%;
        background: var(--wk-surface);
        box-shadow: 0 1px 3px color-mix(in srgb, var(--wk-ink) 25%, transparent);
        transition: transform 120ms ease;
      }
      input:checked + .track {
        background: var(--wk-accent);
      }
      input:checked + .track .thumb {
        transform: translateX(1.15rem);
      }
      input:focus-visible + .track {
        box-shadow: var(--wk-focus);
      }
      :host([disabled]) label {
        opacity: 0.55;
        cursor: not-allowed;
      }
    `,
  ];

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
          role="switch"
          name=${this.name}
          .checked=${this.checked}
          ?disabled=${this.disabled}
          aria-checked=${this.checked ? "true" : "false"}
          @change=${this.onChange}
        />
        <span class="track" aria-hidden="true"
          ><span class="thumb"></span
        ></span>
        <span>${this.label}</span>
      </label>
    `;
  }
}

defineElement("wk-switch", WkSwitch);

declare global {
  interface HTMLElementTagNameMap {
    "wk-switch": WkSwitch;
  }
}
