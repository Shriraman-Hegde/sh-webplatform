import { html, nothing, type PropertyValues } from "lit";
import { cssText } from "../../../styles/css.js";
import wkStyles from "../../../styles/components/wk-select.css";
import { createRef, ref } from "lit/directives/ref.js";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";
import "../../layout/wk-icon/index.js";

export const WEBKIT_SELECT_PLACEMENTS = ["bottom", "top", "start", "end"] as const;
export type WkSelectPlacement = (typeof WEBKIT_SELECT_PLACEMENTS)[number];

export type WkSelectOption = {
  value: string;
  label: string;
  /** Icon name from the host icon library. */
  icon?: string;
};

const GAP = 4;

export class WkSelect extends WkElement {
  static properties = {
    label: { type: String },
    name: { type: String },
    value: { type: String },
    disabled: { type: Boolean, reflect: true },
    size: { type: String, reflect: true },
    options: { attribute: false },
    leadingIcon: { type: String, attribute: "leading-icon" },
    /** Side the menu opens toward: bottom, top, start, or end. */
    placement: { type: String, reflect: true },
    /** Paint the menu on the top layer so overflow does not clip it. */
    hoist: { type: Boolean, reflect: true },
    open: { type: Boolean, reflect: true, state: true },
    activeIndex: { state: true },
  };

  declare label: string;
  declare name: string;
  declare value: string;
  declare disabled: boolean;
  declare size: "sm" | "md" | "lg";
  declare options: WkSelectOption[];
  declare leadingIcon: string;
  declare placement: WkSelectPlacement;
  declare hoist: boolean;
  declare open: boolean;
  declare activeIndex: number;

  #listId = `wk-select-${Math.random().toString(36).slice(2, 9)}`;
  #trigger = createRef<HTMLButtonElement>();
  #menu = createRef<HTMLElement>();

  constructor() {
    super();
    this.label = "";
    this.name = "";
    this.value = "";
    this.disabled = false;
    this.size = "md";
    this.options = [];
    this.leadingIcon = "";
    this.placement = "bottom";
    this.hoist = false;
    this.open = false;
    this.activeIndex = 0;
  }

  static styles = [
    WkElement.styles,
    cssText(wkStyles),
  ];

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener("pointerdown", this.#onDocPointer);
    window.addEventListener("resize", this.#onReposition);
    window.addEventListener("scroll", this.#onReposition, true);
  }

  disconnectedCallback() {
    document.removeEventListener("pointerdown", this.#onDocPointer);
    window.removeEventListener("resize", this.#onReposition);
    window.removeEventListener("scroll", this.#onReposition, true);
    super.disconnectedCallback();
  }

  protected willUpdate(changed: PropertyValues) {
    if (
      changed.has("placement") &&
      !(WEBKIT_SELECT_PLACEMENTS as readonly string[]).includes(this.placement)
    ) {
      this.placement = "bottom";
    }
    if (changed.has("disabled") && this.disabled) {
      this.open = false;
    }
  }

  protected updated(changed: PropertyValues) {
    if (
      changed.has("open") ||
      (this.open && (changed.has("hoist") || changed.has("placement")))
    ) {
      this.#syncMenu();
    }
  }

  #onDocPointer = (event: Event) => {
    if (!this.open) return;
    if (event.composedPath().includes(this)) return;
    this.open = false;
  };

  #onReposition = () => {
    if (this.open && this.hoist) this.#positionMenu();
  };

  #selectedIndex() {
    const index = this.options.findIndex((option) => option.value === this.value);
    return index >= 0 ? index : 0;
  }

  #syncMenu() {
    const menu = this.#menu.value;
    if (!menu) return;
    if (!this.open || !this.hoist) {
      if (menu.matches(":popover-open")) menu.hidePopover();
      menu.style.top = "";
      menu.style.left = "";
      menu.style.width = "";
      menu.style.minWidth = "";
      return;
    }
    if (!menu.matches(":popover-open")) menu.showPopover();
    this.#positionMenu();
    requestAnimationFrame(() => {
      if (this.open && this.hoist) this.#positionMenu();
    });
  }

  #positionMenu() {
    const trigger = this.#trigger.value;
    const menu = this.#menu.value;
    if (!trigger || !menu) return;
    const rect = trigger.getBoundingClientRect();
    const menuRect = menu.getBoundingClientRect();
    const rtl = getComputedStyle(this).direction === "rtl";
    const placement = this.#fitPlacement(rect, menuRect, rtl);
    const vertical = placement === "top" || placement === "bottom";
    let top = placement === "top" ? rect.top - menuRect.height - GAP : rect.bottom + GAP;
    let left = rect.left;
    if (placement === "start") {
      top = rect.top;
      left = rtl ? rect.right + GAP : rect.left - menuRect.width - GAP;
    } else if (placement === "end") {
      top = rect.top;
      left = rtl ? rect.left - menuRect.width - GAP : rect.right + GAP;
    }
    const usedWidth = vertical ? rect.width : menuRect.width;
    left = Math.max(8, Math.min(left, window.innerWidth - usedWidth - 8));
    top = Math.max(8, Math.min(top, window.innerHeight - menuRect.height - 8));
    menu.style.top = `${top}px`;
    menu.style.left = `${left}px`;
    menu.style.width = vertical ? `${rect.width}px` : "";
    menu.style.minWidth = vertical ? "" : `${rect.width}px`;
  }

  #fitPlacement(rect: DOMRect, menu: DOMRect, rtl: boolean): WkSelectPlacement {
    const placement = this.placement;
    const roomBelow = window.innerHeight - rect.bottom;
    const roomAbove = rect.top;
    const roomRight = window.innerWidth - rect.right;
    const roomLeft = rect.left;
    if (placement === "bottom" && roomBelow < menu.height + GAP && roomAbove > roomBelow) {
      return "top";
    }
    if (placement === "top" && roomAbove < menu.height + GAP && roomBelow > roomAbove) {
      return "bottom";
    }
    const startRoom = rtl ? roomRight : roomLeft;
    const endRoom = rtl ? roomLeft : roomRight;
    if (placement === "start" && startRoom < menu.width + GAP && endRoom > startRoom) {
      return "end";
    }
    if (placement === "end" && endRoom < menu.width + GAP && startRoom > endRoom) {
      return "start";
    }
    return placement;
  }

  #toggle() {
    if (this.disabled) return;
    this.open = !this.open;
    if (this.open) this.activeIndex = this.#selectedIndex();
  }

  #move(step: number) {
    if (!this.options.length) return;
    const next = this.activeIndex + step;
    this.activeIndex = Math.max(0, Math.min(this.options.length - 1, next));
  }

  #choose(value: string) {
    const changed = value !== this.value;
    this.value = value;
    this.open = false;
    if (changed) {
      this.dispatchEvent(
        new CustomEvent("wk-change", {
          detail: { value },
          bubbles: true,
          composed: true,
        }),
      );
    }
    this.#trigger.value?.focus();
  }

  #onTriggerKeydown(event: KeyboardEvent) {
    if (this.disabled) return;
    const key = event.key;
    if (key === "ArrowDown" || key === "ArrowUp") {
      event.preventDefault();
      if (!this.open) {
        this.open = true;
        this.activeIndex =
          key === "ArrowUp"
            ? Math.max(0, this.options.length - 1)
            : this.#selectedIndex();
        return;
      }
      this.#move(key === "ArrowDown" ? 1 : -1);
      return;
    }
    if ((key === "Enter" || key === " ") && this.open) {
      event.preventDefault();
      const option = this.options[this.activeIndex];
      if (option) this.#choose(option.value);
      return;
    }
    if (key === "Escape" && this.open) {
      event.preventDefault();
      this.open = false;
    }
    if (key === "Home" && this.open) {
      event.preventDefault();
      this.activeIndex = 0;
    }
    if (key === "End" && this.open) {
      event.preventDefault();
      this.activeIndex = Math.max(0, this.options.length - 1);
    }
  }

  #icon(name: string | undefined) {
    const icon = name?.trim();
    if (!icon) return nothing;
    const size = this.size === "lg" ? "md" : "sm";
    return html`<wk-icon name=${icon} size=${size}></wk-icon>`;
  }

  render() {
    const selected =
      this.options.find((option) => option.value === this.value) ?? this.options[0];
    const lead = this.leadingIcon?.trim();
    const iconSize = this.size === "lg" ? "md" : "sm";
    const activeId = this.open ? `${this.#listId}-opt-${this.activeIndex}` : "";
    const triggerId = `${this.#listId}-trigger`;
    return html`
      <div class="control">
        <label for=${triggerId}>${this.label}</label>
        <div class="field">
          ${lead
            ? html`<span class="lead"
                ><wk-icon name=${lead} size=${iconSize}></wk-icon
              ></span>`
            : null}
          <button
            ${ref(this.#trigger)}
            id=${triggerId}
            class="trigger"
            part="trigger"
            type="button"
            ?disabled=${this.disabled}
            aria-haspopup="listbox"
            aria-expanded=${this.open ? "true" : "false"}
            aria-controls=${this.#listId}
            aria-activedescendant=${activeId || nothing}
            @click=${this.#toggle}
            @keydown=${this.#onTriggerKeydown}
          >
            ${selected?.icon
              ? html`<span class="value-icon">${this.#icon(selected.icon)}</span>`
              : null}
            <span class="value">${selected?.label ?? ""}</span>
          </button>
          <span class="chevron" aria-hidden="true">
            <wk-icon name="chevron-down" size=${iconSize}></wk-icon>
          </span>
          <ul
            ${ref(this.#menu)}
            id=${this.#listId}
            class="menu"
            part="menu"
            role="listbox"
            aria-label=${this.label || "Options"}
            tabindex="-1"
            popover=${this.hoist ? "manual" : nothing}
            ?hidden=${!this.hoist && !this.open}
            @mousedown=${(event: Event) => event.preventDefault()}
          >
            ${this.options.map(
              (option, index) => html`
                <li
                  id=${`${this.#listId}-opt-${index}`}
                  class="option"
                  part="option"
                  role="option"
                  aria-selected=${option.value === this.value ? "true" : "false"}
                  data-active=${index === this.activeIndex && this.open ? "" : nothing}
                  @pointerenter=${() => {
                    this.activeIndex = index;
                  }}
                  @click=${() => this.#choose(option.value)}
                >
                  ${this.#icon(option.icon)}
                  <span>${option.label}</span>
                </li>
              `,
            )}
          </ul>
          ${this.name
            ? html`<input type="hidden" name=${this.name} .value=${this.value} />`
            : null}
        </div>
      </div>
    `;
  }
}

defineElement("wk-select", WkSelect);

declare global {
  interface HTMLElementTagNameMap {
    "wk-select": WkSelect;
  }
}
