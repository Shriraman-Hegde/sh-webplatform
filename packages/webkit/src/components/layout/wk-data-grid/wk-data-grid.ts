import { html } from "lit";
import { cssText } from "../../../styles/css.js";
import wkStyles from "../../../styles/components/wk-data-grid.css";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";

export type WkGridColumn = {
  key: string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  hidden?: boolean;
};

export type WkGridRow = Record<string, string>;

type SortDirection = "asc" | "desc";

function sameKeys(left: string[], right: string[]): boolean {
  return left.length === right.length && left.every((key, index) => key === right[index]);
}

function isNumericPair(left: string, right: string): boolean {
  if (left.trim() === "" || right.trim() === "") return false;
  return Number.isFinite(Number(left)) && Number.isFinite(Number(right));
}

export class WkDataGrid extends WkElement {
  static properties = {
    columns: { attribute: false },
    rows: { attribute: false },
    caption: { type: String },
    sortKey: { state: true },
    sortDirection: { state: true },
    filters: { state: true },
    order: { state: true },
    hiddenKeys: { state: true },
    managerOpen: { state: true },
  };

  declare columns: WkGridColumn[];
  declare rows: WkGridRow[];
  declare caption: string;
  declare sortKey: string;
  declare sortDirection: SortDirection;
  declare filters: Record<string, string>;
  declare order: string[];
  declare hiddenKeys: string[];
  declare managerOpen: boolean;

  constructor() {
    super();
    this.columns = [];
    this.rows = [];
    this.caption = "";
    this.sortKey = "";
    this.sortDirection = "asc";
    this.filters = {};
    this.order = [];
    this.hiddenKeys = [];
    this.managerOpen = false;
  }

  static styles = [WkElement.styles, cssText(wkStyles)];

  private panel?: HTMLElement;

  protected willUpdate(changed: Map<string, unknown>): void {
    if (!changed.has("columns")) return;
    const keys = this.columns.map((column) => column.key);
    const initial = this.order.length === 0;
    const known = new Set(this.order);
    const kept = this.order.filter((key) => keys.includes(key));
    const added = keys.filter((key) => !known.has(key));
    const nextOrder = initial ? keys : [...kept, ...added];
    if (!sameKeys(this.order, nextOrder)) this.order = nextOrder;

    const hidden = new Set(this.hiddenKeys.filter((key) => keys.includes(key)));
    for (const column of this.columns) {
      if (column.hidden && (initial || added.includes(column.key))) hidden.add(column.key);
    }
    const nextHidden = [...hidden];
    if (!sameKeys(this.hiddenKeys, nextHidden)) this.hiddenKeys = nextHidden;
  }

  protected firstUpdated(): void {
    this.panel = this.renderRoot.querySelector(".panel") ?? undefined;
    this.syncManager();
  }

  protected updated(changed: Map<string, unknown>): void {
    if (changed.has("managerOpen")) this.syncManager();
  }

  private columnByKey(key: string): WkGridColumn | undefined {
    return this.columns.find((column) => column.key === key);
  }

  private visibleColumns(): WkGridColumn[] {
    const hidden = new Set(this.hiddenKeys);
    return this.order
      .filter((key) => !hidden.has(key))
      .map((key) => this.columnByKey(key))
      .filter((column): column is WkGridColumn => Boolean(column));
  }

  private visibleRows(columns: WkGridColumn[]): WkGridRow[] {
    const active = Object.entries(this.filters).filter(([, value]) => value.trim() !== "");
    let next = this.rows.filter((row) =>
      active.every(([key, value]) =>
        String(row[key] ?? "").toLowerCase().includes(value.trim().toLowerCase()),
      ),
    );
    if (!this.sortKey || !columns.some((column) => column.key === this.sortKey)) return next;
    const key = this.sortKey;
    const direction = this.sortDirection === "asc" ? 1 : -1;
    next = [...next].sort((left, right) => {
      const a = String(left[key] ?? "");
      const b = String(right[key] ?? "");
      const result = isNumericPair(a, b) ? Number(a) - Number(b) : a.localeCompare(b);
      return result * direction;
    });
    return next;
  }

  private sort(key: string): void {
    if (this.sortKey === key) this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
    else {
      this.sortKey = key;
      this.sortDirection = "asc";
    }
    this.dispatchEvent(
      new CustomEvent("wk-sort", {
        detail: { key, direction: this.sortDirection },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private filter(key: string, value: string): void {
    this.filters = { ...this.filters, [key]: value };
    this.dispatchEvent(
      new CustomEvent("wk-filter", {
        detail: { key, value, filters: { ...this.filters } },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private emitColumns(): void {
    const hidden = new Set(this.hiddenKeys);
    this.dispatchEvent(
      new CustomEvent("wk-columns", {
        detail: {
          columns: this.order.filter((key) => !hidden.has(key)),
          hidden: [...hidden],
        },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private toggleColumn(key: string): void {
    this.hiddenKeys = this.hiddenKeys.includes(key)
      ? this.hiddenKeys.filter((item) => item !== key)
      : [...this.hiddenKeys, key];
    this.emitColumns();
  }

  private move(index: number, delta: number): void {
    const target = index + delta;
    if (target < 0 || target >= this.order.length) return;
    const next = [...this.order];
    const [item] = next.splice(index, 1);
    if (!item) return;
    next.splice(target, 0, item);
    this.order = next;
    this.emitColumns();
  }

  private place(): void {
    const trigger = this.renderRoot.querySelector(".trigger");
    const panel = this.panel;
    if (!trigger || !panel) return;
    const rect = trigger.getBoundingClientRect();
    panel.style.top = `${rect.bottom + 4}px`;
    panel.style.left = `${rect.left}px`;
  }

  private syncManager(): void {
    const panel = this.panel;
    if (!panel || !("showPopover" in panel)) return;
    const shown = panel.matches(":popover-open");
    if (this.managerOpen && !shown) panel.showPopover();
    else if (!this.managerOpen && shown) panel.hidePopover();
    if (this.managerOpen) requestAnimationFrame(() => this.place());
  }

  private onToggle(): void {
    if (!this.panel?.matches(":popover-open")) this.managerOpen = false;
  }

  render() {
    const columns = this.visibleColumns();
    const rows = this.visibleRows(columns);
    const anyFilter = columns.some((column) => column.filterable);
    return html`
      <div class="frame">
        <div class="tools">
          <button
            class="trigger"
            type="button"
            aria-haspopup="dialog"
            aria-expanded=${this.managerOpen ? "true" : "false"}
            @click=${() => {
              this.managerOpen = !this.managerOpen;
            }}
          >
            Columns
          </button>
          <div class="panel" popover="auto" role="dialog" aria-label="Columns" @toggle=${this.onToggle}>
            ${this.order.map((key, index) => {
              const column = this.columnByKey(key);
              if (!column) return null;
              const shown = !this.hiddenKeys.includes(key);
              return html`
                <div class="manager-row">
                  <label>
                    <input
                      type="checkbox"
                      .checked=${shown}
                      @change=${() => this.toggleColumn(key)}
                    />
                    ${column.label}
                  </label>
                  <button
                    type="button"
                    aria-label=${`Move ${column.label} up`}
                    ?disabled=${index === 0}
                    @click=${() => this.move(index, -1)}
                  >
                    Up
                  </button>
                  <button
                    type="button"
                    aria-label=${`Move ${column.label} down`}
                    ?disabled=${index === this.order.length - 1}
                    @click=${() => this.move(index, 1)}
                  >
                    Down
                  </button>
                </div>
              `;
            })}
          </div>
        </div>
        <table part="table">
          ${this.caption ? html`<caption>${this.caption}</caption>` : null}
          <thead>
            <tr>
              ${columns.map((column) => {
                const active = this.sortKey === column.key;
                const sort = !column.sortable ? "none" : active ? this.sortDirection === "asc" ? "ascending" : "descending" : "none";
                return html`
                  <th scope="col" aria-sort=${sort}>
                    ${column.sortable
                      ? html`<button type="button" @click=${() => this.sort(column.key)}>${column.label}</button>`
                      : column.label}
                  </th>
                `;
              })}
            </tr>
            ${anyFilter
              ? html`
                  <tr>
                    ${columns.map(
                      (column) => html`
                        <th>
                          ${column.filterable
                            ? html`<input
                                aria-label=${`Filter ${column.label}`}
                                .value=${this.filters[column.key] ?? ""}
                                @input=${(event: Event) =>
                                  this.filter(column.key, (event.target as HTMLInputElement).value)}
                              />`
                            : null}
                        </th>
                      `,
                    )}
                  </tr>
                `
              : null}
          </thead>
          <tbody>
            ${rows.length
              ? rows.map(
                  (row) => html`
                    <tr>
                      ${columns.map((column) => html`<td>${row[column.key] ?? ""}</td>`)}
                    </tr>
                  `,
                )
              : html`<tr><td colspan=${String(Math.max(columns.length, 1))}>No matching rows</td></tr>`}
          </tbody>
        </table>
      </div>
    `;
  }
}

defineElement("wk-data-grid", WkDataGrid);

declare global {
  interface HTMLElementTagNameMap {
    "wk-data-grid": WkDataGrid;
  }
}
