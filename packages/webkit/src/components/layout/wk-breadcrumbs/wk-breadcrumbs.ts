import { html } from "lit";
import { cssText } from "../../../styles/css.js";
import wkStyles from "../../../styles/components/wk-breadcrumbs.css";
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
    cssText(wkStyles),
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
