import { html } from "lit";
import { cssText } from "../../../styles/css.js";
import wkStyles from "../../../styles/components/wk-textarea.css";
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

export class WkTextarea extends WkElement {
  static properties = {
    label: { type: String },
    name: { type: String },
    value: { type: String },
    rows: { type: Number },
    disabled: { type: Boolean, reflect: true },
    error: { type: Boolean, reflect: true },
    size: { type: String, reflect: true },
    placeholder: { type: String },
    /** Opt-in rich text editor (toolbar + HTML value). Off by default. */
    rich: { type: Boolean, reflect: true },
    /** When `rich`, use icon glyphs in the toolbar (needs icon library). */
    showIcons: { type: Boolean, attribute: "show-icons", reflect: true },
  };

  declare label: string;
  declare name: string;
  declare value: string;
  declare rows: number;
  declare disabled: boolean;
  declare error: boolean;
  declare size: "sm" | "md" | "lg";
  declare placeholder: string;
  declare rich: boolean;
  declare showIcons: boolean;

  #editor?: HTMLDivElement;
  #syncing = false;

  constructor() {
    super();
    this.label = "";
    this.name = "";
    this.value = "";
    this.rows = 4;
    this.disabled = false;
    this.error = false;
    this.size = "md";
    this.placeholder = "";
    this.rich = false;
    this.showIcons = false;
  }

  static styles = [
    WkElement.styles,
    cssText(wkStyles),
  ];

  protected firstUpdated(): void {
    this.bindEditor();
  }

  protected updated(changed: Map<string, unknown>): void {
    if (changed.has("rich")) {
      this.bindEditor();
    }
    if (
      this.rich &&
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

  private bindEditor() {
    this.#editor = this.rich
      ? (this.renderRoot.querySelector(".editor") ?? undefined)
      : undefined;
    if (this.#editor && this.value) {
      this.#syncing = true;
      this.#editor.innerHTML = this.value;
      this.#syncing = false;
    }
  }

  private onPlainInput(e: Event) {
    const next = (e.target as HTMLTextAreaElement).value;
    this.value = next;
    this.dispatchEvent(
      new CustomEvent("wk-input", {
        detail: { value: next },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private emitRich(type: "wk-input" | "wk-change") {
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
    this.emitRich("wk-input");
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

  private renderRich() {
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
            aria-label=${this.label || "Notes"}
            aria-invalid=${this.error ? "true" : "false"}
            data-placeholder=${this.placeholder || "Write something…"}
            @input=${() => this.emitRich("wk-input")}
            @blur=${() => this.emitRich("wk-change")}
          ></div>
        </div>
      </div>
    `;
  }

  private renderPlain() {
    return html`
      <label>
        <span>${this.label}</span>
        <textarea
          name=${this.name}
          rows=${this.rows}
          .value=${this.value}
          placeholder=${this.placeholder}
          ?disabled=${this.disabled}
          aria-invalid=${this.error ? "true" : "false"}
          @input=${this.onPlainInput}
        ></textarea>
      </label>
    `;
  }

  render() {
    return this.rich ? this.renderRich() : this.renderPlain();
  }
}

defineElement("wk-textarea", WkTextarea);

declare global {
  interface HTMLElementTagNameMap {
    "wk-textarea": WkTextarea;
  }
}
