import { html } from "lit";
import { cssText } from "../../../styles/css.js";
import wkStyles from "../../../styles/components/wk-top-bar.css";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";

export class WkTopBar extends WkElement {
  static properties = {
    title: { type: String },
  };

  declare title: string;

  constructor() {
    super();
    this.title = "";
  }

  static styles = [WkElement.styles, cssText(wkStyles)];

  render() {
    return html`
      <header part="bar">
        <div class="start"><slot name="start"></slot></div>
        <h1>${this.title}</h1>
        <div class="center"><slot></slot></div>
        <div class="end"><slot name="end"></slot></div>
      </header>
    `;
  }
}

defineElement("wk-top-bar", WkTopBar);

declare global {
  interface HTMLElementTagNameMap {
    "wk-top-bar": WkTopBar;
  }
}
