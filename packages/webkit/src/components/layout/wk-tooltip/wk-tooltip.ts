import { css, html } from "lit";
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
    css`
      :host {
        position: relative;
        display: inline-flex;
      }
      .tip {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        z-index: 2;
        max-width: 16rem;
        padding: 0.35rem 0.55rem;
        border-radius: var(--wk-radius);
        background: var(--wk-ink);
        color: var(--wk-surface);
        font-size: 0.78rem;
        line-height: 1.3;
        white-space: nowrap;
        opacity: 0;
        pointer-events: none;
        transition: opacity 120ms ease;
      }
      :host([placement="top"]) .tip,
      :host(:not([placement])) .tip {
        bottom: calc(100% + 0.4rem);
      }
      :host([placement="bottom"]) .tip {
        top: calc(100% + 0.4rem);
      }
      :host(:hover) .tip,
      :host(:focus-within) .tip {
        opacity: 1;
      }
      @media (prefers-reduced-motion: reduce) {
        .tip {
          transition: none;
        }
      }
    `,
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
