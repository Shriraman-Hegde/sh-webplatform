import { css, html } from "lit";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";
import { applyTheme, getTheme, type WebkitTheme } from "../../../theme/index.js";
import "../../form/wk-button/index.js";
import "../../form/wk-checkbox/index.js";
import "../../form/wk-select/index.js";
import "../../form/wk-text-field/index.js";
import "../../layout/wk-card/index.js";
import "../../layout/wk-data-table/index.js";
import "../../layout/wk-page-shell/index.js";
import "../../layout/wk-status-banner/index.js";

export class WkWorkbench extends WkElement {
  static properties = {
    theme: { state: true },
    bannerTone: { state: true },
    titleValue: { state: true },
    dept: { state: true },
    urgent: { state: true },
  };

  declare theme: WebkitTheme;
  declare bannerTone: "empty" | "loading" | "error";
  declare titleValue: string;
  declare dept: string;
  declare urgent: boolean;

  constructor() {
    super();
    this.theme = "default";
    this.bannerTone = "empty";
    this.titleValue = "Sample request";
    this.dept = "stores";
    this.urgent = false;
  }

  static styles = [WkElement.styles, css`
    :host {
      display: block;
    }
    .grid {
      display: grid;
      gap: var(--wk-space-6);
      grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
    }
    @media (max-width: 860px) {
      .grid {
        grid-template-columns: 1fr;
      }
    }
    .row {
      display: grid;
      gap: var(--wk-space-4);
    }
    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: var(--wk-space-2);
      margin-top: var(--wk-space-4);
    }
    select.theme {
      font: inherit;
      border-radius: var(--wk-radius);
      border: 1px solid var(--wk-border);
      background: var(--wk-surface);
      color: var(--wk-ink);
      padding: 0.45rem 0.7rem;
    }
  `];

  connectedCallback() {
    super.connectedCallback();
    this.theme = applyTheme(getTheme());
  }

  private setTheme(theme: WebkitTheme) {
    this.theme = applyTheme(theme);
  }

  render() {
    return html`
      <wk-page-shell
        page-title="Workbench"
        subtitle="Synthetic demo page for webkit form + layout primitives"
      >
        <select
          slot="actions"
          class="theme"
          aria-label="Theme"
          .value=${this.theme}
          @change=${(e: Event) =>
            this.setTheme((e.target as HTMLSelectElement).value as WebkitTheme)}
        >
          <option value="default">default</option>
          <option value="warm">warm</option>
        </select>

        <wk-status-banner
          tone=${this.bannerTone}
          message=${this.bannerTone === "loading"
            ? "Fetching linked records…"
            : this.bannerTone === "error"
              ? "Could not load linked records."
              : "No linked records yet — submit the form to continue."}
        ></wk-status-banner>

        <div class="grid">
          <wk-card heading="Request details">
            <div class="row">
              <wk-text-field
                label="Title"
                name="title"
                .value=${this.titleValue}
                @wk-input=${(e: CustomEvent<{ value: string }>) => {
                  this.titleValue = e.detail.value;
                }}
              ></wk-text-field>
              <wk-select
                label="Department"
                name="department"
                .value=${this.dept}
                .options=${[
                  { value: "stores", label: "Stores" },
                  { value: "production", label: "Production" },
                  { value: "onboarding", label: "Onboarding" },
                ]}
                @wk-change=${(e: CustomEvent<{ value: string }>) => {
                  this.dept = e.detail.value;
                }}
              ></wk-select>
              <wk-checkbox
                label="Mark as urgent"
                name="urgent"
                .checked=${this.urgent}
                @wk-change=${(e: CustomEvent<{ checked: boolean }>) => {
                  this.urgent = e.detail.checked;
                }}
              ></wk-checkbox>
            </div>
            <div class="actions">
              <wk-button
                variant="primary"
                @click=${() => {
                  this.bannerTone = "loading";
                }}
                >Submit</wk-button
              >
              <wk-button
                variant="secondary"
                @click=${() => {
                  this.bannerTone = "error";
                }}
                >Simulate error</wk-button
              >
              <wk-button
                variant="secondary"
                @click=${() => {
                  this.bannerTone = "empty";
                }}
                >Reset banner</wk-button
              >
            </div>
          </wk-card>

          <wk-card heading="Linked items">
            <wk-data-table
              caption="Demo references"
              .columns=${[
                { key: "id", label: "ID" },
                { key: "type", label: "Type" },
                { key: "owner", label: "Owner" },
              ]}
              .rows=${[
                { id: "COL-77", type: "Collateral", owner: "Risk" },
                { id: "FAC-1001", type: "Facility", owner: "Credit" },
                { id: "BOR-42", type: "Borrower", owner: "Onboarding" },
              ]}
            ></wk-data-table>
          </wk-card>
        </div>
      </wk-page-shell>
    `;
  }
}

defineElement("wk-workbench", WkWorkbench);

declare global {
  interface HTMLElementTagNameMap {
    "wk-workbench": WkWorkbench;
  }
}
