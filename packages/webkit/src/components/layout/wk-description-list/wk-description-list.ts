import { html } from "lit";
import { cssText } from "../../../styles/css.js";
import wkStyles from "../../../styles/components/wk-description-list.css";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";

export type WkDescription = { term: string; detail: string };

export class WkDescriptionList extends WkElement {
  static properties = {
    items: { attribute: false },
  };

  declare items: WkDescription[];

  constructor() {
    super();
    this.items = [];
  }

  static styles = [WkElement.styles, cssText(wkStyles)];

  render() {
    return html`
      <dl part="list">
        ${this.items.map((item) => html`<dt>${item.term}</dt><dd>${item.detail}</dd>`)}
      </dl>
    `;
  }
}

defineElement("wk-description-list", WkDescriptionList);

declare global {
  interface HTMLElementTagNameMap {
    "wk-description-list": WkDescriptionList;
  }
}
