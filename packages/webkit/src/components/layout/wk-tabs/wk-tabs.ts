import { css, html } from "lit";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";

export type WkTabItem = { id: string; label: string };

export class WkTabs extends WkElement {
  static properties = {
    tabs: { attribute: false },
    active: { type: String, reflect: true },
  };

  declare tabs: WkTabItem[];
  declare active: string;

  constructor() {
    super();
    this.tabs = [];
    this.active = "";
  }

  static styles = [
    WkElement.styles,
    css`
      :host {
        display: block;
      }
      .list {
        display: flex;
        flex-wrap: wrap;
        gap: var(--wk-space-1);
        border-bottom: 1px solid var(--wk-border);
        margin: 0 0 var(--wk-space-4);
      }
      button {
        font: inherit;
        border: 0;
        background: transparent;
        color: var(--wk-muted);
        padding: 0.65rem 0.9rem;
        cursor: pointer;
        border-bottom: 2px solid transparent;
        margin-bottom: -1px;
      }
      button[aria-selected="true"] {
        color: var(--wk-ink);
        border-bottom-color: var(--wk-accent);
        font-weight: 700;
      }
      button:focus-visible {
        outline: none;
        box-shadow: var(--wk-focus);
        border-radius: var(--wk-radius) var(--wk-radius) 0 0;
      }
      .panel {
        display: none;
      }
      .panel[data-active="true"] {
        display: block;
      }
    `,
  ];

  protected willUpdate(): void {
    if (!this.active && this.tabs.length) {
      this.active = this.tabs[0]!.id;
    }
  }

  private select(id: string) {
    this.active = id;
    this.dispatchEvent(
      new CustomEvent("wk-change", {
        detail: { id },
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    return html`
      <div class="list" role="tablist">
        ${this.tabs.map(
          (tab) => html`
            <button
              type="button"
              role="tab"
              id="tab-${tab.id}"
              aria-controls="panel-${tab.id}"
              aria-selected=${tab.id === this.active ? "true" : "false"}
              tabindex=${tab.id === this.active ? 0 : -1}
              @click=${() => this.select(tab.id)}
            >
              ${tab.label}
            </button>
          `,
        )}
      </div>
      ${this.tabs.map(
        (tab) => html`
          <div
            class="panel"
            role="tabpanel"
            id="panel-${tab.id}"
            aria-labelledby="tab-${tab.id}"
            data-active=${tab.id === this.active ? "true" : "false"}
            ?hidden=${tab.id !== this.active}
          >
            <slot name=${tab.id}></slot>
          </div>
        `,
      )}
    `;
  }
}

defineElement("wk-tabs", WkTabs);

declare global {
  interface HTMLElementTagNameMap {
    "wk-tabs": WkTabs;
  }
}
