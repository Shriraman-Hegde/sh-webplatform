import { css, html } from "lit";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";
import "../../layout/wk-icon/index.js";

function sanitizeHtml(raw: string): string {
  const template = document.createElement("template");
  template.innerHTML = raw;
  template.content
    .querySelectorAll("script,style,iframe,object,embed")
    .forEach((n) => n.remove());
  template.content.querySelectorAll("*").forEach((el) => {
    for (const attr of [...el.attributes]) {
      const name = attr.name.toLowerCase();
      if (name.startsWith("on") || name === "srcdoc") {
        el.removeAttribute(attr.name);
      }
    }
  });
  return template.innerHTML;
}

export class WkRichText extends WkElement {
  static properties = {
    label: { type: String },
    value: { type: String },
    disabled: { type: Boolean, reflect: true },
    error: { type: Boolean, reflect: true },
    placeholder: { type: String },
  };

  declare label: string;
  declare value: string;
  declare disabled: boolean;
  declare error: boolean;
  declare placeholder: string;

  #editor?: HTMLDivElement;
  #syncing = false;

  constructor() {
    super();
    this.label = "";
    this.value = "";
    this.disabled = false;
    this.error = false;
    this.placeholder = "Write something…";
  }

  static styles = [
    WkElement.styles,
    css`
      :host {
        display: block;
      }
      .wrap {
        display: grid;
        gap: var(--wk-space-2);
      }
      .label {
        font-size: var(--wk-text-sm);
        font-weight: 600;
      }
      .shell {
        border: 1px solid var(--wk-border);
        border-radius: var(--wk-radius);
        background: var(--wk-surface);
        overflow: hidden;
        transition:
          border-color var(--wk-ease),
          box-shadow var(--wk-ease);
      }
      :host([error]) .shell {
        border-color: var(--wk-danger);
      }
      .shell:focus-within {
        box-shadow: var(--wk-focus);
        border-color: var(--wk-accent);
      }
      .toolbar {
        display: flex;
        flex-wrap: wrap;
        gap: var(--wk-space-1);
        padding: var(--wk-space-2);
        border-bottom: 1px solid var(--wk-border);
        background: color-mix(in srgb, var(--wk-bg) 65%, var(--wk-surface));
      }
      .toolbar button {
        font: inherit;
        border: 1px solid transparent;
        background: transparent;
        color: var(--wk-ink);
        border-radius: var(--wk-radius-sm);
        min-width: 2rem;
        min-height: 2rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
      .toolbar button:hover:not(:disabled) {
        background: color-mix(in srgb, var(--wk-ink) 6%, transparent);
      }
      .toolbar button:focus-visible {
        outline: none;
        box-shadow: var(--wk-focus);
      }
      .toolbar button:disabled {
        opacity: 0.45;
        cursor: not-allowed;
      }
      .editor {
        min-height: 7rem;
        padding: var(--wk-space-3) var(--wk-space-4);
        font: var(--wk-text-md) / var(--wk-leading) var(--wk-font-sans);
        color: var(--wk-ink);
        outline: none;
      }
      .editor:empty::before {
        content: attr(data-placeholder);
        color: var(--wk-muted);
        pointer-events: none;
      }
      :host([disabled]) .editor {
        opacity: 0.6;
        pointer-events: none;
      }
    `,
  ];

  protected firstUpdated(): void {
    this.#editor = this.renderRoot.querySelector(".editor") ?? undefined;
    if (this.#editor && this.value) {
      this.#syncing = true;
      this.#editor.innerHTML = this.value;
      this.#syncing = false;
    }
  }

  protected updated(changed: Map<string, unknown>): void {
    if (
      changed.has("value") &&
      this.#editor &&
      !this.#syncing &&
      this.#editor.innerHTML !== this.value
    ) {
      this.#syncing = true;
      this.#editor.innerHTML = this.value;
      this.#syncing = false;
    }
    if (this.#editor) {
      this.#editor.contentEditable = this.disabled ? "false" : "true";
    }
  }

  private emit(type: "wk-input" | "wk-change") {
    const raw = this.#editor?.innerHTML ?? "";
    const next = sanitizeHtml(raw);
    this.#syncing = true;
    this.value = next;
    this.#syncing = false;
    this.dispatchEvent(
      new CustomEvent(type, {
        detail: { value: next },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private exec(command: string, value?: string) {
    if (this.disabled) return;
    this.#editor?.focus();
    document.execCommand(command, false, value);
    this.emit("wk-input");
  }

  private link() {
    if (this.disabled) return;
    const url = window.prompt("Link URL");
    if (!url) return;
    this.exec("createLink", url);
  }

  render() {
    return html`
      <div class="wrap">
        ${this.label ? html`<div class="label">${this.label}</div>` : null}
        <div class="shell">
          <div class="toolbar" role="toolbar" aria-label="Formatting">
            <button
              type="button"
              title="Bold"
              ?disabled=${this.disabled}
              @click=${() => this.exec("bold")}
            >
              <wk-icon name="bold" size="sm"></wk-icon>
            </button>
            <button
              type="button"
              title="Italic"
              ?disabled=${this.disabled}
              @click=${() => this.exec("italic")}
            >
              <wk-icon name="italic" size="sm"></wk-icon>
            </button>
            <button
              type="button"
              title="Underline"
              ?disabled=${this.disabled}
              @click=${() => this.exec("underline")}
            >
              <wk-icon name="underline" size="sm"></wk-icon>
            </button>
            <button
              type="button"
              title="Bulleted list"
              ?disabled=${this.disabled}
              @click=${() => this.exec("insertUnorderedList")}
            >
              <wk-icon name="list" size="sm"></wk-icon>
            </button>
            <button
              type="button"
              title="Numbered list"
              ?disabled=${this.disabled}
              @click=${() => this.exec("insertOrderedList")}
            >
              <wk-icon name="list" size="sm"></wk-icon>
            </button>
            <button
              type="button"
              title="Link"
              ?disabled=${this.disabled}
              @click=${() => this.link()}
            >
              <wk-icon name="link" size="sm"></wk-icon>
            </button>
          </div>
          <div
            class="editor"
            role="textbox"
            aria-multiline="true"
            aria-label=${this.label || "Rich text"}
            data-placeholder=${this.placeholder}
            @input=${() => this.emit("wk-input")}
            @blur=${() => this.emit("wk-change")}
          ></div>
        </div>
      </div>
    `;
  }
}

defineElement("wk-rich-text", WkRichText);

declare global {
  interface HTMLElementTagNameMap {
    "wk-rich-text": WkRichText;
  }
}
