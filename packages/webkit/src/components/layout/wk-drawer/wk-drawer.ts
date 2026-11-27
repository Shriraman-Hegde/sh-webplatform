import { html } from "lit";
import { cssText } from "../../../styles/css.js";
import wkStyles from "../../../styles/components/wk-drawer.css";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";

export class WkDrawer extends WkElement {
  static properties = {
    open: { type: Boolean, reflect: true },
    heading: { type: String },
    placement: { type: String, reflect: true },
  };

  declare open: boolean;
  declare heading: string;
  declare placement: "start" | "end";

  constructor() {
    super();
    this.open = false;
    this.heading = "";
    this.placement = "end";
  }

  static styles = [WkElement.styles, cssText(wkStyles)];

  private dialogEl?: HTMLDialogElement;

  protected firstUpdated(): void {
    this.dialogEl = this.renderRoot.querySelector("dialog") ?? undefined;
    this.syncOpen();
  }

  protected updated(changed: Map<string, unknown>): void {
    if (changed.has("open")) this.syncOpen();
  }

  private syncOpen(): void {
    const dialog = this.dialogEl;
    if (!dialog) return;
    if (this.open && !dialog.open) dialog.showModal();
    else if (!this.open && dialog.open) dialog.close();
  }

  private close(): void {
    this.open = false;
    this.dispatchEvent(
      new CustomEvent("wk-close", { bubbles: true, composed: true }),
    );
  }

  private onDialogClose(): void {
    if (this.open) this.close();
  }

  private onBackdrop(event: Event): void {
    if (event.target === this.dialogEl) this.close();
  }

  render() {
    return html`
      <dialog
        class=${this.placement === "start" ? "start" : "end"}
        @close=${this.onDialogClose}
        @click=${this.onBackdrop}
      >
        <div class="panel" @click=${(event: Event) => event.stopPropagation()}>
          <header>
            <h2>${this.heading}</h2>
            <button type="button" aria-label="Close" @click=${this.close}>
              ×
            </button>
          </header>
          <div class="body"><slot></slot></div>
          <footer><slot name="actions"></slot></footer>
        </div>
      </dialog>
    `;
  }
}

defineElement("wk-drawer", WkDrawer);

declare global {
  interface HTMLElementTagNameMap {
    "wk-drawer": WkDrawer;
  }
}
