import { css, html } from "lit";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";

export class WkDivider extends WkElement {
  static properties = {
    label: { type: String },
  };

  declare label: string;

  constructor() {
    super();
    this.label = "";
  }

  static styles = [
    WkElement.styles,
    css`
      :host {
        display: block;
      }
      .row {
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        align-items: center;
        gap: var(--wk-space-3);
        color: var(--wk-muted);
        font-size: 0.8rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.04em;
      }
      hr {
        border: 0;
        border-top: 1px solid var(--wk-border);
        margin: 0;
      }
      .plain {
        border: 0;
        border-top: 1px solid var(--wk-border);
        margin: var(--wk-space-2) 0;
      }
    `,
  ];

  render() {
    if (!this.label) {
      return html`<hr class="plain" />`;
    }
    return html`
      <div class="row" role="separator" aria-label=${this.label}>
        <hr />
        <span>${this.label}</span>
        <hr />
      </div>
    `;
  }
}

defineElement("wk-divider", WkDivider);

declare global {
  interface HTMLElementTagNameMap {
    "wk-divider": WkDivider;
  }
}
