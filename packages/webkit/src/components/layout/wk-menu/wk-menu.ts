import { html } from "lit";
import { cssText } from "../../../styles/css.js";
import wkStyles from "../../../styles/components/wk-menu.css";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";

export class WkMenu extends WkElement {
  static properties = {
    label: { type: String },
    open: { type: Boolean, reflect: true },
  };

  declare label: string;
  declare open: boolean;

  constructor() {
    super();
    this.label = "Actions";
    this.open = false;
  }

  static styles = [WkElement.styles, cssText(wkStyles)];

  private panel?: HTMLElement;

  protected firstUpdated(): void {
    this.panel = this.renderRoot.querySelector(".panel") ?? undefined;
    this.syncOpen();
  }

  protected updated(changed: Map<string, unknown>): void {
    if (changed.has("open")) this.syncOpen();
  }

  private place(): void {
    const trigger = this.renderRoot.querySelector(".trigger");
    const panel = this.panel;
    if (!trigger || !panel) return;
    const rect = trigger.getBoundingClientRect();
    panel.style.top = `${rect.bottom + 4}px`;
    panel.style.left = `${rect.left}px`;
  }

  private syncOpen(): void {
    const panel = this.panel;
    if (!panel || !("showPopover" in panel)) return;
    const shown = panel.matches(":popover-open");
    if (this.open && !shown) panel.showPopover();
    else if (!this.open && shown) panel.hidePopover();
    if (this.open) requestAnimationFrame(() => this.place());
  }

  private toggle(): void {
    this.open = !this.open;
  }

  private onToggle(event: Event): void {
    if (event.type === "toggle" && !this.panel?.matches(":popover-open")) {
      this.open = false;
    }
  }

  private onChoose(event: Event): void {
    const button = event
      .composedPath()
      .find((node): node is HTMLButtonElement => node instanceof HTMLButtonElement);
    if (!button || button.classList.contains("trigger")) return;
    const value = button.value || button.textContent?.trim() || "";
    this.open = false;
    this.dispatchEvent(
      new CustomEvent("wk-select", {
        detail: { value },
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    return html`
      <button
        class="trigger"
        type="button"
        aria-haspopup="menu"
        aria-expanded=${this.open ? "true" : "false"}
        @click=${this.toggle}
      >
        ${this.label}
      </button>
      <div
        class="panel"
        popover="auto"
        role="menu"
        @toggle=${this.onToggle}
        @click=${this.onChoose}
      >
        <slot></slot>
      </div>
    `;
  }
}

defineElement("wk-menu", WkMenu);

declare global {
  interface HTMLElementTagNameMap {
    "wk-menu": WkMenu;
  }
}
