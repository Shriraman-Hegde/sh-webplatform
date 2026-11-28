import { html } from "lit";
import { cssText } from "../../../styles/css.js";
import wkStyles from "../../../styles/components/wk-calendar.css";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";
import "../wk-icon/index.js";

const weekday = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

type CalendarView = "days" | "months" | "years";

function pad(value: number): string {
  return String(value).padStart(2, "0");
}

function iso(year: number, month: number, day: number): string {
  return `${year}-${pad(month + 1)}-${pad(day)}`;
}

export class WkCalendar extends WkElement {
  static properties = {
    value: { type: String },
    year: { type: Number },
    month: { type: Number },
    view: { state: true },
    yearStart: { state: true },
  };

  declare value: string;
  declare year: number;
  declare month: number;
  declare view: CalendarView;
  declare yearStart: number;

  constructor() {
    super();
    const today = new Date();
    this.value = "";
    this.year = today.getFullYear();
    this.month = today.getMonth();
    this.view = "days";
    this.yearStart = Math.floor(today.getFullYear() / 12) * 12;
  }

  static styles = [WkElement.styles, cssText(wkStyles)];

  private monthLabel(index: number, length: "long" | "short"): string {
    return new Date(this.year, index, 1).toLocaleString(undefined, { month: length });
  }

  private shift(delta: number): void {
    if (this.view === "years") {
      this.yearStart += delta * 12;
      return;
    }
    if (this.view === "months") {
      this.year += delta;
      return;
    }
    const next = new Date(this.year, this.month + delta, 1);
    this.year = next.getFullYear();
    this.month = next.getMonth();
  }

  private shiftYear(delta: number): void {
    this.year += delta;
  }

  private showMonths(): void {
    this.view = this.view === "months" ? "days" : "months";
  }

  private showYears(): void {
    if (this.view === "years") {
      this.view = "days";
      return;
    }
    this.yearStart = Math.floor(this.year / 12) * 12;
    this.view = "years";
  }

  private pickMonth(month: number): void {
    this.month = month;
    this.view = "days";
  }

  private pickYear(year: number): void {
    this.year = year;
    this.view = "days";
  }

  private choose(day: number): void {
    this.value = iso(this.year, this.month, day);
    this.dispatchEvent(
      new CustomEvent("wk-change", {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private renderDays(label: string) {
    const start = new Date(this.year, this.month, 1).getDay();
    const days = new Date(this.year, this.month + 1, 0).getDate();
    const cells: Array<number | null> = [
      ...Array.from({ length: start }, () => null),
      ...Array.from({ length: days }, (_, index) => index + 1),
    ];
    return html`
      <div class="grid" role="grid" aria-label=${label}>
        ${weekday.map((name) => html`<span class="dow">${name}</span>`)}
        ${cells.map((day) =>
          day === null
            ? html`<span></span>`
            : html`<button
                type="button"
                role="gridcell"
                aria-selected=${this.value === iso(this.year, this.month, day) ? "true" : "false"}
                @click=${() => this.choose(day)}
              >${day}</button>`,
        )}
      </div>
    `;
  }

  private renderMonths() {
    return html`
      <div class="choices" role="listbox" aria-label="Month">
        ${Array.from({ length: 12 }, (_, index) => html`
          <button
            type="button"
            role="option"
            data-month=${index}
            aria-selected=${index === this.month ? "true" : "false"}
            @click=${() => this.pickMonth(index)}
          >${this.monthLabel(index, "short")}</button>
        `)}
      </div>
    `;
  }

  private renderYears() {
    const years = Array.from({ length: 12 }, (_, index) => this.yearStart + index);
    return html`
      <div class="choices" role="listbox" aria-label=${`${years[0]} to ${years[11]}`}>
        ${years.map((year) => html`
          <button
            type="button"
            role="option"
            data-year=${year}
            aria-selected=${year === this.year ? "true" : "false"}
            @click=${() => this.pickYear(year)}
          >${year}</button>
        `)}
      </div>
    `;
  }

  render() {
    const monthName = this.monthLabel(this.month, "long");
    const label = `${monthName} ${this.year}`;
    const [previous, next] =
      this.view === "years"
        ? ["Previous years", "Next years"]
        : this.view === "months"
          ? ["Previous year", "Next year"]
          : ["Previous month", "Next month"];
    return html`
      <div part="calendar">
        <div class="bar">
          <span class="nav">
            ${this.view === "days"
              ? html`<button type="button" aria-label="Previous year" @click=${() => this.shiftYear(-1)}><wk-icon name="chevrons-left" size="sm"></wk-icon></button>`
              : null}
            <button type="button" aria-label=${previous} @click=${() => this.shift(-1)}><wk-icon name="chevron-left" size="sm"></wk-icon></button>
          </span>
          <span class="title">
            <button
              type="button"
              aria-label="Choose month"
              aria-expanded=${this.view === "months" ? "true" : "false"}
              @click=${this.showMonths}
            >${monthName}</button>
            <button
              type="button"
              aria-label="Choose year"
              aria-expanded=${this.view === "years" ? "true" : "false"}
              @click=${this.showYears}
            >${this.year}</button>
          </span>
          <span class="nav">
            <button type="button" aria-label=${next} @click=${() => this.shift(1)}><wk-icon name="chevron-right" size="sm"></wk-icon></button>
            ${this.view === "days"
              ? html`<button type="button" aria-label="Next year" @click=${() => this.shiftYear(1)}><wk-icon name="chevrons-right" size="sm"></wk-icon></button>`
              : null}
          </span>
        </div>
        ${this.view === "months" ? this.renderMonths() : null}
        ${this.view === "years" ? this.renderYears() : null}
        ${this.view === "days" ? this.renderDays(label) : null}
      </div>
    `;
  }
}

defineElement("wk-calendar", WkCalendar);

declare global {
  interface HTMLElementTagNameMap {
    "wk-calendar": WkCalendar;
  }
}
