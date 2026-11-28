import { html } from "lit";
import { cssText } from "../../../styles/css.js";
import wkStyles from "../../../styles/components/wk-timeline.css";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";

export type WkTimelineItem = { id: string; title: string; time: string; detail?: string };

export class WkTimeline extends WkElement {
  static properties = {
    items: { attribute: false },
  };

  declare items: WkTimelineItem[];

  constructor() {
    super();
    this.items = [];
  }

  static styles = [WkElement.styles, cssText(wkStyles)];

  render() {
    return html`
      <ol part="list">
        ${this.items.map(
          (item) => html`
            <li>
              <time datetime=${item.time}>${item.time}</time>
              <strong>${item.title}</strong>
              ${item.detail ? html`<p>${item.detail}</p>` : null}
            </li>
          `,
        )}
      </ol>
    `;
  }
}

defineElement("wk-timeline", WkTimeline);

declare global {
  interface HTMLElementTagNameMap {
    "wk-timeline": WkTimeline;
  }
}
