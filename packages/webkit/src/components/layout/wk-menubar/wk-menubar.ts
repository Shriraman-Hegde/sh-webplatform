import { html } from "lit";
import { cssText } from "../../../styles/css.js";
import wkStyles from "../../../styles/components/wk-menubar.css";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";

export type WkMenuBarItem = { id: string; label: string; items: { value: string; label: string }[] };

export class WkMenubar extends WkElement {
  static properties = {
    label: { type: String },
    menus: { attribute: false },
    open: { type: String },
  };

  declare label: string;
  declare menus: WkMenuBarItem[];
  declare open: string;

  constructor() {
    super();
    this.label = "Menu";
    this.menus = [];
    this.open = "";
  }

  static styles = [WkElement.styles, cssText(wkStyles)];

  private choose(value: string): void {
    this.open = "";
    this.dispatchEvent(new CustomEvent("wk-select", { detail: { value }, bubbles: true, composed: true }));
  }

  private onKey(event: KeyboardEvent): void {
    if (event.key === "Escape") {
      this.open = "";
      return;
    }
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    const ids = this.menus.map((menu) => menu.id);
    const index = Math.max(0, ids.indexOf(this.open || ids[0]));
    const next = event.key === "ArrowRight" ? ids[(index + 1) % ids.length] : ids[(index - 1 + ids.length) % ids.length];
    this.open = next;
  }

  render() {
    return html`
      <div role="menubar" aria-label=${this.label} part="bar" @keydown=${this.onKey}>
        ${this.menus.map(
          (menu) => html`
            <div class="menu">
              <button type="button" role="menuitem" aria-haspopup="true" aria-expanded=${this.open === menu.id ? "true" : "false"} @click=${() => { this.open = this.open === menu.id ? "" : menu.id; }}>${menu.label}</button>
              <div class="panel" role="menu" ?hidden=${this.open !== menu.id}>
                ${menu.items.map((item) => html`<button type="button" role="menuitem" @click=${() => this.choose(item.value)}>${item.label}</button>`)}
              </div>
            </div>
          `,
        )}
      </div>
    `;
  }
}

defineElement("wk-menubar", WkMenubar);

declare global {
  interface HTMLElementTagNameMap {
    "wk-menubar": WkMenubar;
  }
}
