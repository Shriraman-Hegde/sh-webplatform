import { html } from "lit";
import { cssText } from "../../../styles/css.js";
import wkStyles from "../../../styles/components/wk-page-shell.css";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";

export class WkPageShell extends WkElement {
  static properties = {
    pageTitle: { type: String, attribute: "page-title" },
    subtitle: { type: String },
  };

  declare pageTitle: string;
  declare subtitle: string;

  constructor() {
    super();
    this.pageTitle = "Workbench";
    this.subtitle = "";
  }

  static styles = [WkElement.styles, cssText(wkStyles)];

  render() {
    return html`
      <header>
        <div>
          <h1>${this.pageTitle}</h1>
          ${this.subtitle ? html`<p>${this.subtitle}</p>` : null}
        </div>
        <div class="actions"><slot name="actions"></slot></div>
      </header>
      <main><slot></slot></main>
    `;
  }
}

defineElement("wk-page-shell", WkPageShell);

declare global {
  interface HTMLElementTagNameMap {
    "wk-page-shell": WkPageShell;
  }
}
