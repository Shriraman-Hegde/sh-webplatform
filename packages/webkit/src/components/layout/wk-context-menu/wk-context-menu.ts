import { html } from "lit";
import { cssText } from "../../../styles/css.js";
import wkStyles from "../../../styles/components/wk-context-menu.css";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";

export type WkContextItem = { value: string; label: string };

export class WkContextMenu extends WkElement {
  static properties = {
    items: { attribute: false },
    open: { type: Boolean, reflect: true },
  };

  declare items: WkContextItem[];
  declare open: boolean;

  constructor() {
    super();
    this.items = [];
    this.open = false;
  }

  static styles = [WkElement.styles, cssText(wkStyles)];

  private panel?: HTMLElement;

  protected firstUpdated(): void {
    this.panel = this.renderRoot.querySelector(".panel") ?? undefined;
  }

  private openAt(event: MouseEvent): void {
    event.preventDefault();
    this.open = true;
    const panel = this.panel;
    if (!panel) return;
    if ("showPopover" in panel && !panel.matches(":popover-open")) panel.showPopover();
    panel.style.left = `${event.clientX}px`;
    panel.style.top = `${event.clientY}px`;
  }

  private choose(value: string): void {
    this.open = false;
    this.panel?.hidePopover?.();
    this.dispatchEvent(new CustomEvent("wk-select", { detail: { value }, bubbles: true, composed: true }));
  }

  render() {
    return html`
      <div class="target" @contextmenu=${this.openAt}><slot></slot></div>
      <div class="panel" part="menu" popover="auto" role="menu" @keydown=${(event: KeyboardEvent) => { if (event.key === "Escape") { this.open = false; this.panel?.hidePopover?.(); } }} @toggle=${() => { if (!this.panel?.matches(":popover-open")) this.open = false; }}>
        ${this.items.map((item) => html`<button type="button" role="menuitem" @click=${() => this.choose(item.value)}>${item.label}</button>`)}
      </div>
    `;
  }
}

defineElement("wk-context-menu", WkContextMenu);

declare global {
  interface HTMLElementTagNameMap {
    "wk-context-menu": WkContextMenu;
  }
}
