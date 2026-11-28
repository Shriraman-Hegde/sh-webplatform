import { html } from "lit";
import { cssText } from "../../../styles/css.js";
import wkStyles from "../../../styles/components/wk-file-drop.css";
import notes from "../../../styles/components/wk-field-notes.css";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";
import { describedBy, fieldChromeProperties, fieldNotes, initFieldChrome } from "../field-notes.js";

export type WkFileInfo = { name: string; size: number; type: string };

export class WkFileDrop extends WkElement {
  static properties = {
    label: { type: String },
    ...fieldChromeProperties,
    accept: { type: String },
    multiple: { type: Boolean, reflect: true },
    files: { attribute: false },
  };

  declare label: string;
  declare name: string;
  declare disabled: boolean;
  declare error: boolean;
  declare size: "sm" | "md" | "lg";
  declare hint: string;
  declare message: string;
  declare accept: string;
  declare multiple: boolean;
  declare files: WkFileInfo[];

  constructor() {
    super();
    initFieldChrome(this);
    this.label = "Drop files";
    this.accept = "";
    this.multiple = false;
    this.files = [];
  }

  static styles = [WkElement.styles, cssText(wkStyles), cssText(notes)];

  private accepted(file: File): boolean {
    const rules = this.accept.split(",").map((rule) => rule.trim().toLowerCase()).filter(Boolean);
    if (!rules.length) return true;
    const name = file.name.toLowerCase();
    const type = file.type.toLowerCase();
    return rules.some((rule) => {
      if (rule.endsWith("/*")) return type.startsWith(rule.slice(0, -1));
      if (rule.startsWith(".")) return name.endsWith(rule);
      return type === rule;
    });
  }

  private take(list: FileList | null): void {
    if (this.disabled) return;
    const files = [...(list ?? [])]
      .filter((file) => this.accepted(file))
      .map((file) => ({ name: file.name, size: file.size, type: file.type }));
    this.files = this.multiple ? files : files.slice(0, 1);
    this.dispatchEvent(
      new CustomEvent("wk-change", {
        detail: { files: this.files },
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    return html`
      <label
        part="drop"
        aria-describedby=${describedBy(this)}
        @dragover=${(event: DragEvent) => {
          if (this.disabled) return;
          event.preventDefault();
          this.setAttribute("data-active", "");
        }}
        @dragleave=${() => this.removeAttribute("data-active")}
        @drop=${(event: DragEvent) => {
          event.preventDefault();
          this.removeAttribute("data-active");
          this.take(event.dataTransfer?.files ?? null);
        }}
      >
        <span>${this.label}</span>
        <input
          part="control"
          type="file"
          name=${this.name}
          accept=${this.accept}
          ?multiple=${this.multiple}
          ?disabled=${this.disabled}
          @change=${(event: Event) => this.take((event.target as HTMLInputElement).files)}
        />
      </label>
      ${fieldNotes(this)}
      ${this.files.length
        ? html`<ul>${this.files.map((file) => html`<li>${file.name}</li>`)}</ul>`
        : null}
    `;
  }
}

defineElement("wk-file-drop", WkFileDrop);

declare global {
  interface HTMLElementTagNameMap {
    "wk-file-drop": WkFileDrop;
  }
}
