import { html, nothing } from "lit";
import { cssText } from "../../../styles/css.js";
import wkStyles from "../../../styles/components/wk-combobox.css";
import notes from "../../../styles/components/wk-field-notes.css";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";
import "../../layout/wk-icon/index.js";
import { describedBy, fieldChromeProperties, fieldNotes, initFieldChrome } from "../field-notes.js";

export type WkComboOption = { value: string; label: string };

export const WEBKIT_COMBO_PLACEMENTS = ["bottom", "top"] as const;
export type WkComboPlacement = (typeof WEBKIT_COMBO_PLACEMENTS)[number];

export class WkCombobox extends WkElement {
  static properties = {
    label: { type: String },
    ...fieldChromeProperties,
    value: { type: String },
    query: { type: String },
    open: { type: Boolean, reflect: true },
    options: { attribute: false },
    placement: { type: String, reflect: true },
    hoist: { type: Boolean, reflect: true },
    activeIndex: { state: true },
  };

  declare label: string;
  declare name: string;
  declare disabled: boolean;
  declare error: boolean;
  declare size: "sm" | "md" | "lg";
  declare hint: string;
  declare message: string;
  declare value: string;
  declare query: string;
  declare open: boolean;
  declare options: WkComboOption[];
  declare placement: WkComboPlacement;
  declare hoist: boolean;
  declare activeIndex: number;

  #listId = `wk-combo-${Math.random().toString(36).slice(2, 9)}`;

  constructor() {
    super();
    this.label = "";
    initFieldChrome(this);
    this.value = "";
    this.query = "";
    this.open = false;
    this.options = [];
    this.placement = "bottom";
    this.hoist = false;
    this.activeIndex = 0;
  }

  static styles = [WkElement.styles, cssText(wkStyles), cssText(notes)];

  private list?: HTMLElement;

  override connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener("pointerdown", this.onDocPointer);
    window.addEventListener("resize", this.onReposition);
    window.addEventListener("scroll", this.onReposition, true);
  }

  override disconnectedCallback(): void {
    document.removeEventListener("pointerdown", this.onDocPointer);
    window.removeEventListener("resize", this.onReposition);
    window.removeEventListener("scroll", this.onReposition, true);
    super.disconnectedCallback();
  }

  protected firstUpdated(): void {
    this.list = this.renderRoot.querySelector("[part=list]") ?? undefined;
    this.syncList();
  }

  protected willUpdate(): void {
    if (!(WEBKIT_COMBO_PLACEMENTS as readonly string[]).includes(this.placement)) {
      this.placement = "bottom";
    }
    if (this.disabled) this.open = false;
    if (this.activeIndex >= this.filteredOptions.length) this.activeIndex = 0;
  }

  protected updated(changed: Map<string, unknown>): void {
    if (changed.has("open") || changed.has("hoist") || changed.has("placement") || changed.has("query")) {
      this.syncList();
    }
  }

  private onDocPointer = (event: Event): void => {
    if (!this.open) return;
    if (event.composedPath().includes(this)) return;
    this.open = false;
  };

  private onReposition = (): void => {
    if (this.open && this.hoist) this.place();
  };

  private get filteredOptions(): WkComboOption[] {
    const query = this.query.trim().toLowerCase();
    if (!query) return this.options;
    return this.options.filter((option) => option.label.toLowerCase().includes(query));
  }

  private choose(option: WkComboOption): void {
    this.value = option.value;
    this.query = option.label;
    this.open = false;
    this.dispatchEvent(
      new CustomEvent("wk-change", {
        detail: { value: option.value },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private onKey(event: KeyboardEvent): void {
    if (this.disabled) return;
    const matches = this.filteredOptions;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!this.open) {
        this.open = true;
        this.activeIndex = event.key === "ArrowUp" ? Math.max(0, matches.length - 1) : 0;
        return;
      }
      if (!matches.length) return;
      const delta = event.key === "ArrowDown" ? 1 : -1;
      this.activeIndex = (this.activeIndex + delta + matches.length) % matches.length;
      return;
    }
    if (event.key === "Enter" && this.open) {
      event.preventDefault();
      const option = matches[this.activeIndex];
      if (option) this.choose(option);
      return;
    }
    if (event.key === "Escape" && this.open) {
      event.preventDefault();
      this.open = false;
    }
  }

  private place(): void {
    const input = this.renderRoot.querySelector("input");
    const list = this.list;
    if (!input || !list) return;
    const rect = input.getBoundingClientRect();
    const listRect = list.getBoundingClientRect();
    const top = this.placement === "top" ? rect.top - listRect.height - 4 : rect.bottom + 4;
    list.style.top = `${Math.max(8, top)}px`;
    list.style.left = `${Math.max(8, rect.left)}px`;
    list.style.width = `${rect.width}px`;
  }

  private syncList(): void {
    const list = this.list;
    if (!list || !("showPopover" in list)) return;
    if (!this.open || !this.hoist) {
      if (list.matches(":popover-open")) list.hidePopover();
      list.style.top = "";
      list.style.left = "";
      list.style.width = "";
      return;
    }
    if (!list.matches(":popover-open")) list.showPopover();
    this.place();
    requestAnimationFrame(() => {
      if (this.open && this.hoist) this.place();
    });
  }

  render() {
    const matches = this.filteredOptions;
    const activeId = this.open && matches.length ? `${this.#listId}-opt-${this.activeIndex}` : "";
    return html`
      <div class="field">
      <label>
        <span>${this.label}</span>
        <span class="control">
        <input
          part="control"
          role="combobox"
          aria-expanded=${this.open ? "true" : "false"}
          aria-autocomplete="list"
          aria-controls=${this.#listId}
          aria-activedescendant=${activeId || nothing}
          aria-invalid=${this.error ? "true" : "false"}
          aria-describedby=${describedBy(this)}
          .value=${this.query}
          ?disabled=${this.disabled}
          @focus=${() => {
            if (!this.disabled) this.open = true;
          }}
          @input=${(event: Event) => {
            this.query = (event.target as HTMLInputElement).value;
            this.activeIndex = 0;
            this.open = true;
          }}
          @keydown=${this.onKey}
        />
        <wk-icon class="chevron" name="chevron-down" size="sm"></wk-icon>
        </span>
      </label>
      <ul
        id=${this.#listId}
        role="listbox"
        part="list"
        popover=${this.hoist ? "manual" : nothing}
        ?hidden=${!this.hoist && !this.open}
      >
        ${matches.length === 0
          ? html`<li class="empty">No matches</li>`
          : matches.map(
              (option, index) => html`
                <li
                  id=${`${this.#listId}-opt-${index}`}
                  role="option"
                  aria-selected=${option.value === this.value ? "true" : "false"}
                  data-active=${index === this.activeIndex ? "" : nothing}
                >
                  <button type="button" @click=${() => this.choose(option)}>${option.label}</button>
                </li>
              `,
            )}
      </ul>
      </div>
      ${fieldNotes(this)}
      ${this.name ? html`<input type="hidden" name=${this.name} .value=${this.value} />` : nothing}
    `;
  }
}

defineElement("wk-combobox", WkCombobox);

declare global {
  interface HTMLElementTagNameMap {
    "wk-combobox": WkCombobox;
  }
}
