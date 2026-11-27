import { html } from "lit";
import { cssText } from "../../../styles/css.js";
import wkStyles from "../../../styles/components/wk-tooltip.css";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";

export class WkTooltip extends WkElement {
  static properties = {
    content: { type: String },
    placement: { type: String, reflect: true },
  };

  declare content: string;
  declare placement: "top" | "bottom";

  constructor() {
    super();
    this.content = "";
    this.placement = "top";
  }

  static styles = [
    WkElement.styles,
    cssText(wkStyles),
  ];

  render() {
    return html`
      <slot></slot>
      <span class="tip" role="tooltip">${this.content}</span>
    `;
  }
}

defineElement("wk-tooltip", WkTooltip);

declare global {
  interface HTMLElementTagNameMap {
    "wk-tooltip": WkTooltip;
  }
}
