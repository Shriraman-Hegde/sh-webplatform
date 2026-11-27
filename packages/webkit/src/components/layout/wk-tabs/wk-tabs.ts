import { html } from "lit";
import { cssText } from "../../../styles/css.js";
import wkStyles from "../../../styles/components/wk-tabs.css";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";
import "../wk-icon/index.js";

export type WkTabItem = { id: string; label: string; icon?: string };

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
    cssText(wkStyles),
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
              ${tab.icon
                ? html`<wk-icon name=${tab.icon} size="sm"></wk-icon>`
                : null}
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
