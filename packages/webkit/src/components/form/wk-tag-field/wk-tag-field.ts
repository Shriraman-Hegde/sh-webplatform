import { html } from "lit";
import { cssText } from "../../../styles/css.js";
import wkStyles from "../../../styles/components/wk-tag-field.css";
import notes from "../../../styles/components/wk-field-notes.css";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";
import "../../layout/wk-icon/index.js";
import { describedBy, fieldChromeProperties, fieldNotes, initFieldChrome } from "../field-notes.js";

export class WkTagField extends WkElement {
  static properties = {
    label: { type: String },
    ...fieldChromeProperties,
    tags: { attribute: false },
  };

  declare label: string;
  declare name: string;
  declare disabled: boolean;
  declare error: boolean;
  declare size: "sm" | "md" | "lg";
  declare hint: string;
  declare message: string;
  declare tags: string[];
  private draft = "";

  constructor() {
    super();
    initFieldChrome(this);
    this.label = "Tags";
    this.tags = [];
  }

  static styles = [WkElement.styles, cssText(wkStyles), cssText(notes)];

  private emit(): void {
    this.dispatchEvent(new CustomEvent("wk-change", { detail: { tags: [...this.tags] }, bubbles: true, composed: true }));
  }

  private add(raw: string): void {
    const next = raw.trim();
    if (!next || this.tags.includes(next)) return;
    this.tags = [...this.tags, next];
    this.draft = "";
    this.emit();
  }

  private removeTag(tag: string): void {
    this.tags = this.tags.filter((item) => item !== tag);
    this.emit();
  }

  private onKey(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      this.add(input.value);
      input.value = "";
    } else if (event.key === "Backspace" && !input.value && this.tags.length) {
      this.removeTag(this.tags[this.tags.length - 1]);
    }
  }

  render() {
    return html`
      <label>
        <span>${this.label}</span>
        <div class="box" part="control" aria-invalid=${this.error ? "true" : "false"} aria-describedby=${describedBy(this)}>
          ${this.tags.map(
            (tag) => html`
              <span class="tag">
                ${tag}
                <button type="button" aria-label=${`Remove ${tag}`} ?disabled=${this.disabled} @click=${() => this.removeTag(tag)}><wk-icon name="close" size="sm"></wk-icon></button>
              </span>
            `,
          )}
          <input
            .value=${this.draft}
            ?disabled=${this.disabled}
            @input=${(event: Event) => { this.draft = (event.target as HTMLInputElement).value; }}
            @keydown=${this.onKey}
          />
        </div>
        ${fieldNotes(this)}
      </label>
      ${this.name ? html`<input type="hidden" name=${this.name} .value=${this.tags.join(",")} />` : null}
    `;
  }
}

defineElement("wk-tag-field", WkTagField);

declare global {
  interface HTMLElementTagNameMap {
    "wk-tag-field": WkTagField;
  }
}
