import { html } from "lit";
import { cssText } from "../../../styles/css.js";
import wkStyles from "../../../styles/components/wk-card.css";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";

export class WkCard extends WkElement {
  static properties = {
    heading: { type: String },
  };

  declare heading: string;

  constructor() {
    super();
    this.heading = "";
  }

  static styles = [WkElement.styles, cssText(wkStyles)];

  render() {
    return html`
      ${this.heading ? html`<h2>${this.heading}</h2>` : null}
      <slot></slot>
    `;
  }
}

defineElement("wk-card", WkCard);

declare global {
  interface HTMLElementTagNameMap {
    "wk-card": WkCard;
  }
}
