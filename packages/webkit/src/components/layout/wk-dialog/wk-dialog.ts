import { css, html } from "lit";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";

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
    css`
      :host {
        display: contents;
      }
      dialog {
        border: 1px solid var(--wk-border);
        border-radius: calc(var(--wk-radius) + 2px);
        padding: 0;
        background: var(--wk-surface);
        color: var(--wk-ink);
        box-shadow: 0 20px 50px color-mix(in srgb, var(--wk-ink) 18%, transparent);
        max-width: min(28rem, calc(100vw - 2rem));
        width: 100%;
      }
      dialog::backdrop {
        background: color-mix(in srgb, var(--wk-ink) 45%, transparent);
      }
      header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--wk-space-3);
        padding: var(--wk-space-4) var(--wk-space-6);
        border-bottom: 1px solid var(--wk-border);
      }
      h2 {
        margin: 0;
        font-size: 1.1rem;
      }
      .body {
        padding: var(--wk-space-6);
      }
      footer {
        display: flex;
        justify-content: flex-end;
        gap: var(--wk-space-2);
        padding: var(--wk-space-4) var(--wk-space-6);
        border-top: 1px solid var(--wk-border);
      }
      .close {
        font: inherit;
        border: 0;
        background: transparent;
        color: var(--wk-muted);
        cursor: pointer;
        padding: 0.25rem 0.4rem;
        border-radius: var(--wk-radius);
      }
      .close:focus-visible {
        outline: none;
        box-shadow: var(--wk-focus);
      }
    `,
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
      <dialog @close=${this.onDialogClose}>
        <header>
          <h2>${this.heading}</h2>
          <button class="close" type="button" aria-label="Close" @click=${this.close}>
            ×
          </button>
        </header>
        <div class="body"><slot></slot></div>
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
