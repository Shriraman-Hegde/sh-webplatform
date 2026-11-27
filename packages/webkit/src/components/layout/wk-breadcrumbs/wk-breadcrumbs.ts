import { css, html } from "lit";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";
import "../wk-icon/index.js";

export type WkBreadcrumbItem = { label: string; href?: string; icon?: string };

export class WkBreadcrumbs extends WkElement {
  static properties = {
    items: { attribute: false },
  };

  declare items: WkBreadcrumbItem[];

  constructor() {
    super();
    this.items = [];
  }

  static styles = [
    WkElement.styles,
    css`
      :host {
        display: block;
      }
      nav ol {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-wrap: wrap;
        gap: var(--wk-space-2);
        align-items: center;
        font-size: 0.9rem;
      }
      li {
        display: inline-flex;
        align-items: center;
        gap: var(--wk-space-2);
        color: var(--wk-muted);
      }
      .crumb {
        display: inline-flex;
        align-items: center;
        gap: var(--wk-space-1);
      }
      a {
        color: var(--wk-accent);
        text-decoration: none;
      }
      a:hover {
        text-decoration: underline;
      }
      a:focus-visible {
        outline: none;
        box-shadow: var(--wk-focus);
        border-radius: 2px;
      }
      .sep {
        color: var(--wk-border);
      }
      [aria-current="page"] {
        color: var(--wk-ink);
        font-weight: 600;
      }
    `,
  ];

  render() {
    const last = this.items.length - 1;
    return html`
      <nav aria-label="Breadcrumb">
        <ol>
          ${this.items.map(
            (item, index) => html`
              <li>
                ${index > 0 ? html`<span class="sep" aria-hidden="true">/</span>` : null}
                ${index === last || !item.href
                  ? html`<span
                      class="crumb"
                      aria-current=${index === last ? "page" : undefined}
                      >${item.icon
                        ? html`<wk-icon name=${item.icon} size="sm"></wk-icon>`
                        : null}${item.label}</span
                    >`
                  : html`<a class="crumb" href=${item.href}
                      >${item.icon
                        ? html`<wk-icon name=${item.icon} size="sm"></wk-icon>`
                        : null}${item.label}</a
                    >`}
              </li>
            `,
          )}
        </ol>
      </nav>
    `;
  }
}

defineElement("wk-breadcrumbs", WkBreadcrumbs);

declare global {
  interface HTMLElementTagNameMap {
    "wk-breadcrumbs": WkBreadcrumbs;
  }
}
