import { html } from "lit";
import { cssText } from "../../../styles/css.js";
import wkStyles from "../../../styles/components/wk-list.css";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";
import "../wk-icon/index.js";

export type WkListItem = { id: string; label: string; detail?: string; icon?: string };

export class WkList extends WkElement {
  static properties = {
    label: { type: String },
    items: { attribute: false },
  };

  declare label: string;
  declare items: WkListItem[];

  constructor() {
    super();
    this.label = "List";
    this.items = [];
  }

  static styles = [WkElement.styles, cssText(wkStyles)];

  private choose(id: string): void {
    this.dispatchEvent(new CustomEvent("wk-select", { detail: { id }, bubbles: true, composed: true }));
  }

  render() {
    return html`
      <ul aria-label=${this.label} part="list">
        ${this.items.map(
          (item) => html`
            <li>
              <button type="button" @click=${() => this.choose(item.id)}>
                ${item.icon ? html`<wk-icon name=${item.icon} size="sm"></wk-icon>` : null}
                <span class="text">
                  <span class="label">${item.label}</span>
                  ${item.detail ? html`<span class="detail">${item.detail}</span>` : null}
                </span>
              </button>
            </li>
          `,
        )}
      </ul>
    `;
  }
}

defineElement("wk-list", WkList);

declare global {
  interface HTMLElementTagNameMap {
    "wk-list": WkList;
  }
}
