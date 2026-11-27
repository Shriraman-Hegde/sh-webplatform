import { css, html } from "lit";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";
import "../wk-icon/index.js";

export type WkAccordionItem = { id: string; title: string; icon?: string };

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
        transition: background var(--wk-ease);
      }
      button:hover {
        background: color-mix(in srgb, var(--wk-ink) 3%, transparent);
      }
      .title {
        display: inline-flex;
        align-items: center;
        gap: var(--wk-space-2);
      }
      button:focus-visible {
        outline: none;
        box-shadow: inset var(--wk-focus);
      }
      .chevron {
        width: 0.45rem;
        height: 0.45rem;
        border-right: 2px solid var(--wk-muted);
        border-bottom: 2px solid var(--wk-muted);
        transform: rotate(45deg);
        transition: transform var(--wk-ease);
        flex-shrink: 0;
      }
      button[aria-expanded="true"] .chevron {
        transform: rotate(225deg);
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
              <span class="title">
                ${item.icon
                  ? html`<wk-icon name=${item.icon} size="sm"></wk-icon>`
                  : null}
                ${item.title}
              </span>
              <span class="chevron" aria-hidden="true"></span>
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
