import { LitElement, css, html } from "lit";

export type WkTableColumn = { key: string; label: string };
export type WkTableRow = Record<string, string>;

export class WkDataTable extends LitElement {
  static properties = {
    columns: { attribute: false },
    rows: { attribute: false },
    caption: { type: String },
  };

  declare columns: WkTableColumn[];
  declare rows: WkTableRow[];
  declare caption: string;

  constructor() {
    super();
    this.columns = [];
    this.rows = [];
    this.caption = "";
  }

  static styles = css`
    :host {
      display: block;
      font-family: var(--wk-font-sans);
      color: var(--wk-ink);
      overflow: auto;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      background: var(--wk-surface);
    }
    th,
    td {
      text-align: left;
      padding: 0.7rem 0.85rem;
      border-bottom: 1px solid var(--wk-border);
      font-size: 0.92rem;
    }
    th {
      color: var(--wk-muted);
      font-weight: 700;
      letter-spacing: 0.02em;
      text-transform: uppercase;
      font-size: 0.75rem;
    }
    caption {
      text-align: left;
      padding: 0 0 var(--wk-space-3);
      font-weight: 700;
    }
  `;

  render() {
    return html`
      <table>
        ${this.caption ? html`<caption>${this.caption}</caption>` : null}
        <thead>
          <tr>
            ${this.columns.map((col) => html`<th scope="col">${col.label}</th>`)}
          </tr>
        </thead>
        <tbody>
          ${this.rows.map(
            (row) => html`
              <tr>
                ${this.columns.map((col) => html`<td>${row[col.key] ?? ""}</td>`)}
              </tr>
            `,
          )}
        </tbody>
      </table>
    `;
  }
}

customElements.define("wk-data-table", WkDataTable);

declare global {
  interface HTMLElementTagNameMap {
    "wk-data-table": WkDataTable;
  }
}
