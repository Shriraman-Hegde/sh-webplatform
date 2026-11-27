import { html } from "lit";
import { cssText } from "../../../styles/css.js";
import wkStyles from "../../../styles/components/wk-data-table.css";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";

export type WkTableColumn = { key: string; label: string };
export type WkTableRow = Record<string, string>;

export class WkDataTable extends WkElement {
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

  static styles = [WkElement.styles, cssText(wkStyles)];

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

defineElement("wk-data-table", WkDataTable);

declare global {
  interface HTMLElementTagNameMap {
    "wk-data-table": WkDataTable;
  }
}
