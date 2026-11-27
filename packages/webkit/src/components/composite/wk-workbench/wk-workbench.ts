import { css, html } from "lit";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";
import { applyTheme, getTheme, type WebkitTheme } from "../../../theme/index.js";
import "../../form/wk-button/index.js";
import "../../form/wk-checkbox/index.js";
import "../../form/wk-radio-group/index.js";
import "../../form/wk-select/index.js";
import "../../form/wk-switch/index.js";
import "../../form/wk-rich-text/index.js";
import "../../form/wk-text-field/index.js";
import "../../layout/wk-accordion/index.js";
import "../../layout/wk-alert/index.js";
import "../../layout/wk-badge/index.js";
import "../../layout/wk-breadcrumbs/index.js";
import "../../layout/wk-card/index.js";
import "../../layout/wk-data-table/index.js";
import "../../layout/wk-dialog/index.js";
import "../../layout/wk-divider/index.js";
import "../../layout/wk-icon/index.js";
import "../../layout/wk-link/index.js";
import "../../layout/wk-page-shell/index.js";
import "../../layout/wk-progress/index.js";
import "../../layout/wk-skeleton/index.js";
import "../../layout/wk-spinner/index.js";
import "../../layout/wk-status-banner/index.js";
import "../../layout/wk-tabs/index.js";
import "../../layout/wk-tooltip/index.js";


export class WkWorkbench extends WkElement {
  static properties = {
    theme: { state: true },
    bannerTone: { state: true },
    titleValue: { state: true },
    notes: { state: true },
    dept: { state: true },
    priority: { state: true },
    urgent: { state: true },
    notify: { state: true },
    dialogOpen: { state: true },
    activeTab: { state: true },
    progress: { state: true },
    openIds: { state: true },
  };

  declare theme: WebkitTheme;
  declare bannerTone: "empty" | "loading" | "error";
  declare titleValue: string;
  declare notes: string;
  declare dept: string;
  declare priority: string;
  declare urgent: boolean;
  declare notify: boolean;
  declare dialogOpen: boolean;
  declare activeTab: string;
  declare progress: number;
  declare openIds: string[];

  constructor() {
    super();
    this.theme = "default";
    this.bannerTone = "empty";
    this.titleValue = "Sample request";
    this.notes = "";
    this.dept = "alpha";
    this.priority = "normal";
    this.urgent = false;
    this.notify = true;
    this.dialogOpen = false;
    this.activeTab = "links";
    this.progress = 35;
    this.openIds = ["overview"];
  }

  static styles = [
    WkElement.styles,
    css`
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
        align-items: center;
      }
      .meta {
        display: flex;
        flex-wrap: wrap;
        gap: var(--wk-space-2);
        align-items: center;
        margin-bottom: var(--wk-space-4);
      }
      select.theme {
        font: inherit;
        border-radius: var(--wk-radius);
        border: 1px solid var(--wk-border);
        background: var(--wk-surface);
        color: var(--wk-ink);
        padding: 0.45rem 0.7rem;
      }
    `,
  ];

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

        <wk-breadcrumbs
          .items=${[
            { label: "Home", href: "#", icon: "home" },
            { label: "Team Alpha", href: "#", icon: "user" },
            { label: "Workbench" },
          ]}
        ></wk-breadcrumbs>

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
            <div class="meta">
              <wk-badge tone="accent" icon="edit">Draft</wk-badge>
              ${this.urgent
                ? html`<wk-badge tone="danger" icon="warn">Urgent</wk-badge>`
                : html`<wk-badge icon="check">Normal</wk-badge>`}
            </div>
            <div class="row">
              <wk-text-field
                label="Title"
                name="title"
                leading-icon="edit"
                .value=${this.titleValue}
                @wk-input=${(e: CustomEvent<{ value: string }>) => {
                  this.titleValue = e.detail.value;
                }}
              ></wk-text-field>
              <wk-rich-text
                label="Notes"
                .value=${this.notes}
                @wk-input=${(e: CustomEvent<{ value: string }>) => {
                  this.notes = e.detail.value;
                }}
              ></wk-rich-text>
              <wk-select
                label="Team"
                name="team"
                leading-icon="user"
                .value=${this.dept}
                .options=${[
                  { value: "alpha", label: "Team Alpha" },
                  { value: "beta", label: "Team Beta" },
                  { value: "gamma", label: "Team Gamma" },
                ]}
                @wk-change=${(e: CustomEvent<{ value: string }>) => {
                  this.dept = e.detail.value;
                }}
              ></wk-select>
              <wk-radio-group
                label="Priority"
                name="priority"
                .value=${this.priority}
                .options=${[
                  { value: "low", label: "Low" },
                  { value: "normal", label: "Normal" },
                  { value: "high", label: "High" },
                ]}
                @wk-change=${(e: CustomEvent<{ value: string }>) => {
                  this.priority = e.detail.value;
                }}
              ></wk-radio-group>
              <wk-divider label="Flags"></wk-divider>
              <wk-checkbox
                label="Mark as urgent"
                name="urgent"
                .checked=${this.urgent}
                @wk-change=${(e: CustomEvent<{ checked: boolean }>) => {
                  this.urgent = e.detail.checked;
                }}
              ></wk-checkbox>
              <wk-switch
                label="Email notifications"
                name="notify"
                .checked=${this.notify}
                @wk-change=${(e: CustomEvent<{ checked: boolean }>) => {
                  this.notify = e.detail.checked;
                }}
              ></wk-switch>
            </div>
            <div class="actions">
              <wk-tooltip content="Submit the sample request">
                <wk-button
                  variant="primary"
                  icon="check"
                  @click=${() => {
                    this.bannerTone = "loading";
                    this.progress = Math.min(100, this.progress + 20);
                  }}
                  >Submit</wk-button
                >
              </wk-tooltip>
              <wk-button
                variant="secondary"
                icon="warn"
                @click=${() => {
                  this.bannerTone = "error";
                }}
                >Simulate error</wk-button
              >
              <wk-button
                variant="ghost"
                icon="close"
                @click=${() => {
                  this.bannerTone = "empty";
                }}
                >Reset banner</wk-button
              >
              <wk-button
                variant="secondary"
                icon="external-link"
                @click=${() => {
                  this.dialogOpen = true;
                }}
                >Open dialog</wk-button
              >
              ${this.bannerTone === "loading"
                ? html`<wk-spinner label="Working…"></wk-spinner>`
                : null}
            </div>
            <wk-divider label="Progress"></wk-divider>
            <wk-progress
              label="Completion"
              .value=${this.progress}
            ></wk-progress>
          </wk-card>

          <wk-card heading="Linked items">
            <wk-alert tone="info" heading="Related items">
              Open related records with
              <wk-link href="#item-a" icon="link">wk-link</wk-link>
              or browse tabs below.
            </wk-alert>
            <wk-divider></wk-divider>
            <wk-tabs
              .tabs=${[
                { id: "links", label: "Links", icon: "link" },
                { id: "table", label: "Table", icon: "list" },
                { id: "more", label: "More", icon: "menu" },
              ]}
              .active=${this.activeTab}
              @wk-change=${(e: CustomEvent<{ id: string }>) => {
                this.activeTab = e.detail.id;
              }}
            >
              <div slot="links" class="row">
                <div>
                  <wk-icon name="check" label="Ready"></wk-icon>
                  <wk-link href="#item-a" icon="external-link" icon-position="end"
                    >ITEM-A Sample record</wk-link
                  >
                </div>
                <div>
                  <wk-icon name="info" label="Info"></wk-icon>
                  <wk-link href="#item-b" icon="external-link" icon-position="end"
                    >ITEM-B Sample record</wk-link
                  >
                </div>
              </div>
              <div slot="table">
                <wk-data-table
                  caption="Sample records"
                  .columns=${[
                    { key: "id", label: "ID" },
                    { key: "type", label: "Type" },
                    { key: "owner", label: "Owner" },
                  ]}
                  .rows=${[
                    { id: "ITEM-A", type: "Record", owner: "Team Alpha" },
                    { id: "ITEM-B", type: "Record", owner: "Team Beta" },
                    { id: "ITEM-C", type: "Record", owner: "Team Gamma" },
                  ]}
                ></wk-data-table>
              </div>
              <div slot="more" class="row">
                ${this.bannerTone === "loading"
                  ? html`
                      <wk-skeleton variant="text" width="70%"></wk-skeleton>
                      <wk-skeleton variant="text" width="45%"></wk-skeleton>
                      <wk-skeleton variant="rect" height="4rem"></wk-skeleton>
                    `
                  : html`
                      <wk-accordion
                        .items=${[
                          { id: "overview", title: "Overview", icon: "info" },
                          { id: "notes", title: "Notes", icon: "edit" },
                        ]}
                        .openIds=${this.openIds}
                        @wk-change=${(
                          e: CustomEvent<{ openIds: string[] }>,
                        ) => {
                          this.openIds = e.detail.openIds;
                        }}
                      >
                        <div slot="overview">
                          Sample overview for ITEM-A under Team Alpha.
                        </div>
                        <div slot="notes">
                          Generic notes placeholder for the linked record.
                        </div>
                      </wk-accordion>
                    `}
              </div>
            </wk-tabs>
          </wk-card>
        </div>

        <wk-dialog
          heading="Confirm submit"
          .open=${this.dialogOpen}
          @wk-close=${() => {
            this.dialogOpen = false;
          }}
        >
          <p style="margin:0">
            Submit “${this.titleValue}” for ${this.dept} at ${this.priority}
            priority?
          </p>
          <wk-button
            slot="actions"
            variant="secondary"
            icon="close"
            @click=${() => {
              this.dialogOpen = false;
            }}
            >Cancel</wk-button
          >
          <wk-button
            slot="actions"
            variant="primary"
            icon="check"
            @click=${() => {
              this.dialogOpen = false;
              this.bannerTone = "loading";
            }}
            >Confirm</wk-button
          >
        </wk-dialog>
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
