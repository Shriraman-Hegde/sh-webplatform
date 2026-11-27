import { html } from "lit";
import { cssText } from "../../../styles/css.js";
import wkStyles from "../../../styles/components/wk-spinner.css";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";

export class WkSpinner extends WkElement {
  static properties = {
    label: { type: String },
    size: { type: String, reflect: true },
    animated: { type: Boolean, reflect: true },
  };

  declare label: string;
  declare size: "sm" | "md" | "lg";
  declare animated: boolean;

  constructor() {
    super();
    this.label = "Loading";
    this.size = "md";
    this.animated = true;
  }

  static styles = [
    WkElement.styles,
    cssText(wkStyles),
  ];

  render() {
    return html`
      <span class="ring" aria-hidden="true"></span>
      <span role="status">${this.label}</span>
    `;
  }
}

defineElement("wk-spinner", WkSpinner);

declare global {
  interface HTMLElementTagNameMap {
    "wk-spinner": WkSpinner;
  }
}
