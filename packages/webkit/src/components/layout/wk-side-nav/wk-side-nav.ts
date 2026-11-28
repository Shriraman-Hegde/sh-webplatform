import { html } from "lit";
import { cssText } from "../../../styles/css.js";
import wkStyles from "../../../styles/components/wk-side-nav.css";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";
import "../wk-icon/index.js";

export type WkNavItem = { id: string; label: string; icon?: string };

export class WkSideNav extends WkElement {
  static properties = {
    label: { type: String },
    active: { type: String },
    items: { attribute: false },
  };

  declare label: string;
  declare active: string;
  declare items: WkNavItem[];

  constructor() {
    super();
    this.label = "Navigation";
    this.active = "";
    this.items = [];
  }

  static styles = [WkElement.styles, cssText(wkStyles)];

  private choose(id: string): void {
    this.active = id;
    this.dispatchEvent(new CustomEvent("wk-change", { detail: { id }, bubbles: true, composed: true }));
  }

  render() {
    return html`
      <nav aria-label=${this.label} part="nav">
        ${this.items.map(
          (item) => html`
            <button type="button" aria-current=${item.id === this.active ? "page" : "false"} @click=${() => this.choose(item.id)}>
              ${item.icon ? html`<wk-icon name=${item.icon} size="sm"></wk-icon>` : null}
              <span>${item.label}</span>
            </button>
          `,
        )}
      </nav>
    `;
  }
}

defineElement("wk-side-nav", WkSideNav);

declare global {
  interface HTMLElementTagNameMap {
    "wk-side-nav": WkSideNav;
  }
}
