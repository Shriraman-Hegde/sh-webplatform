import { html, nothing } from "lit";
import { cssText } from "../../../styles/css.js";
import wkStyles from "../../../styles/components/wk-command-palette.css";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";

export type WkCommand = { value: string; label: string; group?: string };

export class WkCommandPalette extends WkElement {
  static properties = {
    open: { type: Boolean, reflect: true },
    query: { type: String },
    commands: { attribute: false },
    activeIndex: { state: true },
  };

  declare open: boolean;
  declare query: string;
  declare commands: WkCommand[];
  declare activeIndex: number;

  constructor() {
    super();
    this.open = false;
    this.query = "";
    this.commands = [];
    this.activeIndex = 0;
  }

  static styles = [WkElement.styles, cssText(wkStyles)];

  private dialog?: HTMLDialogElement;

  protected firstUpdated(): void {
    this.dialog = this.renderRoot.querySelector("dialog") ?? undefined;
    this.sync();
  }

  protected updated(changed: Map<string, unknown>): void {
    if (changed.has("open")) this.sync();
  }

  private sync(): void {
    const dialog = this.dialog;
    if (!dialog) return;
    if (this.open && !dialog.open) dialog.showModal();
    else if (!this.open && dialog.open) dialog.close();
  }

  private dismiss(): void {
    this.open = false;
    this.dispatchEvent(new CustomEvent("wk-close", { bubbles: true, composed: true }));
  }

  private matchingCommands(): WkCommand[] {
    const query = this.query.trim().toLowerCase();
    return this.commands.filter((command) => command.label.toLowerCase().includes(query));
  }

  private onKey(event: KeyboardEvent): void {
    const matches = this.matchingCommands();
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!matches.length) return;
      const delta = event.key === "ArrowDown" ? 1 : -1;
      this.activeIndex = (this.activeIndex + delta + matches.length) % matches.length;
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      const command = matches[this.activeIndex];
      if (command) this.choose(command.value);
    }
  }

  private choose(value: string): void {
    this.open = false;
    this.dispatchEvent(new CustomEvent("wk-select", { detail: { value }, bubbles: true, composed: true }));
  }

  render() {
    const matches = this.matchingCommands();
    return html`
      <dialog part="panel" aria-label="Commands" @close=${() => { if (this.open) this.dismiss(); }}>
        <input
          part="control"
          placeholder="Search commands"
          .value=${this.query}
          @input=${(event: Event) => {
            this.query = (event.target as HTMLInputElement).value;
            this.activeIndex = 0;
          }}
          @keydown=${this.onKey}
        />
        <ul role="listbox">
          ${matches.map(
            (command, index) => html`<li><button type="button" data-active=${index === this.activeIndex ? "" : nothing} @click=${() => this.choose(command.value)}>${command.label}</button></li>`,
          )}
        </ul>
      </dialog>
    `;
  }
}

defineElement("wk-command-palette", WkCommandPalette);

declare global {
  interface HTMLElementTagNameMap {
    "wk-command-palette": WkCommandPalette;
  }
}
