import { html } from "lit";
import { cssText } from "../../../styles/css.js";
import wkStyles from "../../../styles/components/wk-date-field.css";
import notes from "../../../styles/components/wk-field-notes.css";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";
import "../../layout/wk-icon/index.js";
import "../../layout/wk-calendar/index.js";
import type { WkCalendar } from "../../layout/wk-calendar/wk-calendar.js";
import { describedBy, fieldChromeProperties, fieldNotes, initFieldChrome } from "../field-notes.js";

function parseDate(value: string): { year: number; month: number } | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  return { year: Number(match[1]), month: Number(match[2]) - 1 };
}

export class WkDateField extends WkElement {
  static properties = {
    label: { type: String },
    ...fieldChromeProperties,
    value: { type: String },
    open: { type: Boolean, reflect: true },
    iconPosition: { type: String, attribute: "icon-position", reflect: true },
  };

  declare label: string;
  declare name: string;
  declare disabled: boolean;
  declare error: boolean;
  declare size: "sm" | "md" | "lg";
  declare hint: string;
  declare message: string;
  declare value: string;
  declare open: boolean;
  declare iconPosition: "start" | "end";

  constructor() {
    super();
    this.label = "";
    initFieldChrome(this);
    this.value = "";
    this.open = false;
    this.iconPosition = "end";
  }

  protected willUpdate(changed: Map<string, unknown>): void {
    if (
      (changed.has("iconPosition") || !this.hasUpdated) &&
      this.iconPosition !== "start" &&
      this.iconPosition !== "end"
    ) {
      this.iconPosition = "end";
    }
  }

  static styles = [WkElement.styles, cssText(wkStyles), cssText(notes)];

  private panel?: HTMLElement;

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
    this.panel = this.renderRoot.querySelector(".panel") ?? undefined;
    this.hideNativePicker();
    this.syncPanel();
  }

  /** The date input's own glyph ignores shadow stylesheets. A style element hides it. */
  private hideNativePicker(): void {
    const root = this.renderRoot;
    if (root.querySelector("style[data-native-picker]")) return;
    const style = document.createElement("style");
    style.dataset.nativePicker = "";
    style.textContent =
      "input::-webkit-calendar-picker-indicator{display:none!important;opacity:0;width:0;pointer-events:none}";
    root.append(style);
  }

  protected updated(changed: Map<string, unknown>): void {
    if (changed.has("open")) this.syncPanel();
    if (changed.has("open") && this.open) {
      const calendar = this.renderRoot.querySelector("wk-calendar") as WkCalendar | null;
      if (calendar) calendar.view = "days";
    }
    if (changed.has("value") || (changed.has("open") && this.open)) this.syncCalendar();
  }

  private onDocPointer = (event: Event): void => {
    if (!this.open) return;
    if (event.composedPath().includes(this)) return;
    this.open = false;
  };

  private commit(event: Event): void {
    this.value = (event.target as HTMLInputElement).value;
    this.dispatchEvent(
      new CustomEvent("wk-change", { detail: { value: this.value }, bubbles: true, composed: true }),
    );
  }

  private fromCalendar(event: CustomEvent<{ value: string }>): void {
    event.stopPropagation();
    this.value = event.detail.value;
    this.open = false;
    this.dispatchEvent(
      new CustomEvent("wk-change", { detail: { value: this.value }, bubbles: true, composed: true }),
    );
  }

  private togglePicker(): void {
    if (this.disabled) return;
    this.open = !this.open;
  }

  private syncCalendar(): void {
    const calendar = this.renderRoot.querySelector("wk-calendar") as WkCalendar | null;
    const parsed = parseDate(this.value);
    if (!calendar || !parsed) return;
    calendar.year = parsed.year;
    calendar.month = parsed.month;
  }

  private onReposition = (): void => {
    if (this.open) this.place();
  };

  private place(): void {
    const anchor = this.renderRoot.querySelector(".field");
    const panel = this.panel;
    if (!anchor || !panel) return;
    const rect = anchor.getBoundingClientRect();
    const box = panel.getBoundingClientRect();
    const margin = 8;
    const gap = 4;
    const width = box.width || 256;
    const height = box.height || 240;
    const below = window.innerHeight - rect.bottom;
    let top = below < height + margin && rect.top > below ? rect.top - height - gap : rect.bottom + gap;
    let left = this.iconPosition === "start" ? rect.left : rect.right - width;
    left = Math.max(margin, Math.min(left, window.innerWidth - width - margin));
    top = Math.max(margin, Math.min(top, window.innerHeight - height - margin));
    panel.style.top = `${top}px`;
    panel.style.left = `${left}px`;
  }

  private syncPanel(): void {
    const panel = this.panel;
    if (!panel || !("showPopover" in panel)) return;
    const shown = panel.matches(":popover-open");
    if (this.open && !shown) panel.showPopover();
    else if (!this.open && shown) panel.hidePopover();
    if (this.open) {
      this.place();
      requestAnimationFrame(() => this.place());
    }
  }

  private onToggle(): void {
    if (!this.panel?.matches(":popover-open")) this.open = false;
  }

  render() {
    return html`
      <label>
        <span>${this.label}</span>
        <div class="field">
          <input
            part="control"
            type="date"
            name=${this.name}
            .value=${this.value}
            ?disabled=${this.disabled}
            aria-invalid=${this.error ? "true" : "false"}
            aria-describedby=${describedBy(this)}
            @change=${this.commit}
          />
          <button
            type="button"
            class="picker"
            part="picker"
            aria-label="Open calendar"
            aria-expanded=${this.open ? "true" : "false"}
            ?disabled=${this.disabled}
            @click=${this.togglePicker}
          >
            <wk-icon name="calendar" size="sm"></wk-icon>
          </button>
        </div>
        ${fieldNotes(this)}
      </label>
      <div class="panel" part="popup" popover="auto" @toggle=${this.onToggle}>
        <wk-calendar .value=${this.value} @wk-change=${this.fromCalendar}></wk-calendar>
      </div>
    `;
  }
}

defineElement("wk-date-field", WkDateField);

declare global {
  interface HTMLElementTagNameMap {
    "wk-date-field": WkDateField;
  }
}
