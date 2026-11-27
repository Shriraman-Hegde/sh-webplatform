import { css, html } from "lit";
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

  static styles = [WkElement.styles, css`
    :host {
      display: block;
      font-family: var(--wk-font-sans);
      color: var(--wk-ink);
      background: var(--wk-surface);
      border: 1px solid var(--wk-border);
      border-radius: calc(var(--wk-radius) + 2px);
      padding: var(--wk-space-6);
      box-shadow: 0 10px 30px color-mix(in srgb, var(--wk-ink) 6%, transparent);
    }
    h2 {
      margin: 0 0 var(--wk-space-4);
      font-size: 1.15rem;
      font-weight: 700;
    }
  `];

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
