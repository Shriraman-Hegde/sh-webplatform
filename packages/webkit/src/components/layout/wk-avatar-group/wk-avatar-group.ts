import { html } from "lit";
import { cssText } from "../../../styles/css.js";
import wkStyles from "../../../styles/components/wk-avatar-group.css";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";

export type WkAvatarItem = { label: string; src?: string };

function initials(label: string): string {
  return label
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export class WkAvatarGroup extends WkElement {
  static properties = {
    items: { attribute: false },
    max: { type: Number },
  };

  declare items: WkAvatarItem[];
  declare max: number;

  constructor() {
    super();
    this.items = [];
    this.max = 3;
  }

  static styles = [WkElement.styles, cssText(wkStyles)];

  render() {
    const limit = Math.max(1, this.max);
    const shown = this.items.slice(0, limit);
    const extra = this.items.length - shown.length;
    return html`
      <div part="group" role="group" aria-label="People">
        ${shown.map(
          (item) => html`
            <span role="img" aria-label=${item.label}>
              ${item.src
                ? html`<img src=${item.src} alt="" />`
                : html`<span>${initials(item.label)}</span>`}
            </span>
          `,
        )}
        ${extra > 0 ? html`<span class="more" aria-label=${`${extra} more`}>+${extra}</span>` : null}
      </div>
    `;
  }
}

defineElement("wk-avatar-group", WkAvatarGroup);

declare global {
  interface HTMLElementTagNameMap {
    "wk-avatar-group": WkAvatarGroup;
  }
}
