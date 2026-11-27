import { css, html } from "lit";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";

export type WkAccordionItem = { id: string; title: string };

export class WkAccordion extends WkElement {
  static properties = {
    items: { attribute: false },
    openIds: { attribute: false },
    multiple: { type: Boolean, reflect: true },
  };

  declare items: WkAccordionItem[];
  declare openIds: string[];
  declare multiple: boolean;

  constructor() {
    super();
    this.items = [];
    this.openIds = [];
    this.multiple = false;
  }

  static styles = [
    WkElement.styles,
    css`
      :host {
        display: block;
        border: 1px solid var(--wk-border);
        border-radius: var(--wk-radius);
        background: var(--wk-surface);
        overflow: hidden;
      }
      .item + .item {
        border-top: 1px solid var(--wk-border);
      }
      button {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--wk-space-3);
        text-align: left;
        font: inherit;
        font-weight: 600;
        border: 0;
        background: transparent;
        color: var(--wk-ink);
        padding: var(--wk-space-4);
        cursor: pointer;
      }
      button:focus-visible {
        outline: none;
        box-shadow: inset var(--wk-focus);
      }
      .chevron {
        color: var(--wk-muted);
        transition: transform 120ms ease;
      }
      button[aria-expanded="true"] .chevron {
        transform: rotate(180deg);
      }
      .panel {
        padding: 0 var(--wk-space-4) var(--wk-space-4);
        color: var(--wk-muted);
        font-size: 0.95rem;
      }
    `,
  ];

  private isOpen(id: string): boolean {
    return this.openIds.includes(id);
  }

  private toggle(id: string) {
    const open = this.isOpen(id);
    if (this.multiple) {
      this.openIds = open
        ? this.openIds.filter((x) => x !== id)
        : [...this.openIds, id];
    } else {
      this.openIds = open ? [] : [id];
    }
    this.dispatchEvent(
      new CustomEvent("wk-change", {
        detail: { openIds: [...this.openIds] },
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    return html`
      ${this.items.map(
        (item) => html`
          <div class="item">
            <button
              type="button"
              aria-expanded=${this.isOpen(item.id) ? "true" : "false"}
              aria-controls="panel-${item.id}"
              id="header-${item.id}"
              @click=${() => this.toggle(item.id)}
            >
              <span>${item.title}</span>
              <span class="chevron" aria-hidden="true">▾</span>
            </button>
            ${this.isOpen(item.id)
              ? html`<div
                  class="panel"
                  role="region"
                  id="panel-${item.id}"
                  aria-labelledby="header-${item.id}"
                >
                  <slot name=${item.id}></slot>
                </div>`
              : null}
          </div>
        `,
      )}
    `;
  }
}

defineElement("wk-accordion", WkAccordion);

declare global {
  interface HTMLElementTagNameMap {
    "wk-accordion": WkAccordion;
  }
}
