import { html } from "lit";
import { cssText } from "../../../styles/css.js";
import wkStyles from "../../../styles/components/wk-popover.css";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";

export class WkPopover extends WkElement {
  static properties = {
    label: { type: String },
    open: { type: Boolean, reflect: true },
    placement: { type: String, reflect: true },
  };

  declare label: string;
  declare open: boolean;
  declare placement: "bottom" | "top";

  constructor() {
    super();
    this.label = "Details";
    this.open = false;
    this.placement = "bottom";
  }

  static styles = [WkElement.styles, cssText(wkStyles)];

  private panel?: HTMLElement;

  protected firstUpdated(): void {
    this.panel = this.renderRoot.querySelector(".panel") ?? undefined;
    this.syncOpen();
  }

  protected updated(changed: Map<string, unknown>): void {
    if (changed.has("open") || changed.has("placement")) this.syncOpen();
  }

  private place(): void {
    const trigger = this.renderRoot.querySelector(".trigger");
    const panel = this.panel;
    if (!trigger || !panel) return;
    const rect = trigger.getBoundingClientRect();
    const panelRect = panel.getBoundingClientRect();
    const top =
      this.placement === "top" ? rect.top - panelRect.height - 4 : rect.bottom + 4;
    panel.style.top = `${Math.max(8, top)}px`;
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

  private onToggle(): void {
    if (!this.panel?.matches(":popover-open")) this.open = false;
  }

  render() {
    return html`
      <button
        class="trigger"
        part="trigger"
        type="button"
        aria-expanded=${this.open ? "true" : "false"}
        aria-haspopup="dialog"
        @click=${this.toggle}
      >
        ${this.label}
      </button>
      <div class="panel" part="panel" popover="auto" @toggle=${this.onToggle}>
        <slot></slot>
      </div>
    `;
  }
}

defineElement("wk-popover", WkPopover);

declare global {
  interface HTMLElementTagNameMap {
    "wk-popover": WkPopover;
  }
}
