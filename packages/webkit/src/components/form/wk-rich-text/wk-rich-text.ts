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
    size: { type: String, reflect: true },
    placeholder: { type: String },
    /** When true, toolbar uses icon glyphs (requires icon library). */
    showIcons: { type: Boolean, attribute: "show-icons", reflect: true },
  };

  declare label: string;
  declare value: string;
  declare disabled: boolean;
  declare error: boolean;
  declare size: "sm" | "md" | "lg";
  declare placeholder: string;
  declare showIcons: boolean;

  #editor?: HTMLDivElement;
  #syncing = false;

  constructor() {
    super();
    this.label = "";
    this.value = "";
    this.disabled = false;
    this.error = false;
    this.size = "md";
    this.placeholder = "Write something…";
    this.showIcons = false;
  }

  static styles = [
    WkElement.styles,
    css`
      :host {
        display: block;
      }
      :host([size="sm"]) {
        --wk-rt-pad: var(--wk-space-2);
        --wk-rt-font: var(--wk-text-sm);
        --wk-rt-min: 5rem;
      }
      :host([size="md"]),
      :host(:not([size])) {
        --wk-rt-pad: var(--wk-space-3);
        --wk-rt-font: var(--wk-text-md);
        --wk-rt-min: 7rem;
      }
      :host([size="lg"]) {
        --wk-rt-pad: var(--wk-space-4);
        --wk-rt-font: var(--wk-text-lg);
        --wk-rt-min: 9rem;
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
        font-weight: 700;
        font-size: var(--wk-text-sm);
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
        min-height: var(--wk-rt-min, 7rem);
        padding: var(--wk-rt-pad, var(--wk-space-3)) var(--wk-space-4);
        font: var(--wk-rt-font, var(--wk-text-md)) / var(--wk-leading)
          var(--wk-font-sans);
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

  private tool(
    title: string,
    label: string,
    icon: string,
    onClick: () => void,
  ) {
    return html`
      <button
        type="button"
        title=${title}
        ?disabled=${this.disabled}
        @click=${onClick}
      >
        ${this.showIcons
          ? html`<wk-icon name=${icon} size="sm"></wk-icon>`
          : label}
      </button>
    `;
  }

  render() {
    return html`
      <div class="wrap">
        ${this.label ? html`<div class="label">${this.label}</div>` : null}
        <div class="shell">
          <div class="toolbar" role="toolbar" aria-label="Formatting">
            ${this.tool("Bold", "B", "bold", () => this.exec("bold"))}
            ${this.tool("Italic", "I", "italic", () => this.exec("italic"))}
            ${this.tool("Underline", "U", "underline", () =>
              this.exec("underline"),
            )}
            ${this.tool("Bulleted list", "•", "list", () =>
              this.exec("insertUnorderedList"),
            )}
            ${this.tool("Numbered list", "1.", "list", () =>
              this.exec("insertOrderedList"),
            )}
            ${this.tool("Link", "Link", "link", () => this.link())}
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
