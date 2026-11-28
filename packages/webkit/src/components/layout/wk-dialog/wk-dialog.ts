import { html } from "lit";
import { cssText } from "../../../styles/css.js";
import wkStyles from "../../../styles/components/wk-dialog.css";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";
import "../wk-icon/index.js";

export class WkDialog extends WkElement {
  static properties = {
    open: { type: Boolean, reflect: true },
    heading: { type: String },
  };

  declare open: boolean;
  declare heading: string;

  constructor() {
    super();
    this.open = false;
    this.heading = "";
  }

  static styles = [
    WkElement.styles,
    cssText(wkStyles),
  ];

  private dialogEl?: HTMLDialogElement;

  protected firstUpdated(): void {
    this.dialogEl = this.renderRoot.querySelector("dialog") ?? undefined;
    this.syncOpen();
  }

  protected updated(
    changed: Map<string, unknown>,
  ): void {
    if (changed.has("open")) {
      this.syncOpen();
    }
  }

  private syncOpen(): void {
    const dialog = this.dialogEl;
    if (!dialog) return;
    if (this.open && !dialog.open) {
      dialog.showModal();
    } else if (!this.open && dialog.open) {
      dialog.close();
    }
  }

  private close(): void {
    this.open = false;
    this.dispatchEvent(
      new CustomEvent("wk-close", {
        bubbles: true,
        composed: true,
      }),
    );
  }

  private onDialogClose(): void {
    if (this.open) {
      this.close();
    }
  }

  render() {
    return html`
      <dialog part="panel" @close=${this.onDialogClose}>
        <header>
          <h2>${this.heading}</h2>
          <button class="close" type="button" aria-label="Close" @click=${this.close}>
            <wk-icon name="close" size="sm"></wk-icon>
          </button>
        </header>
        <div class="body" part="body"><slot></slot></div>
        <footer><slot name="actions"></slot></footer>
      </dialog>
    `;
  }
}

defineElement("wk-dialog", WkDialog);

declare global {
  interface HTMLElementTagNameMap {
    "wk-dialog": WkDialog;
  }
}
