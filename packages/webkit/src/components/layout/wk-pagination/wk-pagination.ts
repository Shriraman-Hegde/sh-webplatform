import { html } from "lit";
import { cssText } from "../../../styles/css.js";
import wkStyles from "../../../styles/components/wk-pagination.css";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";

export class WkPagination extends WkElement {
  static properties = {
    page: { type: Number, reflect: true },
    pages: { type: Number, reflect: true },
  };

  declare page: number;
  declare pages: number;

  constructor() {
    super();
    this.page = 1;
    this.pages = 1;
  }

  static styles = [WkElement.styles, cssText(wkStyles)];

  protected willUpdate(): void {
    const pages = Math.max(1, Math.floor(this.pages) || 1);
    const page = Math.min(pages, Math.max(1, Math.floor(this.page) || 1));
    this.pages = pages;
    this.page = page;
  }

  private go(next: number): void {
    if (next === this.page || next < 1 || next > this.pages) return;
    this.page = next;
    this.dispatchEvent(
      new CustomEvent("wk-change", {
        detail: { page: this.page },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private window(): number[] {
    const total = this.pages;
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    const start = Math.max(1, Math.min(this.page - 2, total - 4));
    return Array.from({ length: 5 }, (_, i) => start + i);
  }

  render() {
    const items = this.window();
    return html`
      <nav aria-label="Pagination">
        <button
          type="button"
          ?disabled=${this.page <= 1}
          @click=${() => this.go(this.page - 1)}
        >
          Previous
        </button>
        ${items[0] > 1
          ? html`<button type="button" @click=${() => this.go(1)}>1</button
              ><span aria-hidden="true">…</span>`
          : null}
        ${items.map(
          (n) => html`
            <button
              type="button"
              aria-current=${n === this.page ? "page" : "false"}
              @click=${() => this.go(n)}
            >
              ${n}
            </button>
          `,
        )}
        ${items[items.length - 1] < this.pages
          ? html`<span aria-hidden="true">…</span
              ><button type="button" @click=${() => this.go(this.pages)}>
                ${this.pages}
              </button>`
          : null}
        <button
          type="button"
          ?disabled=${this.page >= this.pages}
          @click=${() => this.go(this.page + 1)}
        >
          Next
        </button>
      </nav>
    `;
  }
}

defineElement("wk-pagination", WkPagination);

declare global {
  interface HTMLElementTagNameMap {
    "wk-pagination": WkPagination;
  }
}
