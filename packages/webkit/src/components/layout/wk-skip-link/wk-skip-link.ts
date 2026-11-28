import { html } from "lit";
import { cssText } from "../../../styles/css.js";
import wkStyles from "../../../styles/components/wk-skip-link.css";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";

export class WkSkipLink extends WkElement {
  static properties = {
    href: { type: String },
    label: { type: String },
  };

  declare href: string;
  declare label: string;

  constructor() {
    super();
    this.href = "#main";
    this.label = "Skip to content";
  }

  static styles = [WkElement.styles, cssText(wkStyles)];

  render() {
    return html`<a part="link" href=${this.href}>${this.label}</a>`;
  }
}

defineElement("wk-skip-link", WkSkipLink);

declare global {
  interface HTMLElementTagNameMap {
    "wk-skip-link": WkSkipLink;
  }
}
