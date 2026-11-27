import { css, html } from "lit";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";

export class WkSkeleton extends WkElement {
  static properties = {
    variant: { type: String, reflect: true },
    width: { type: String },
    height: { type: String },
  };

  declare variant: "text" | "rect" | "circle";
  declare width: string;
  declare height: string;

  constructor() {
    super();
    this.variant = "text";
    this.width = "100%";
    this.height = "";
  }

  static styles = [
    WkElement.styles,
    css`
      :host {
        display: block;
      }
      .bone {
        display: block;
        background: linear-gradient(
          90deg,
          var(--wk-border),
          color-mix(in srgb, var(--wk-surface) 70%, var(--wk-border)),
          var(--wk-border)
        );
        background-size: 200% 100%;
        animation: shimmer 1.2s ease-in-out infinite;
      }
      :host([variant="text"]) .bone,
      :host(:not([variant])) .bone {
        height: 0.85rem;
        border-radius: 999px;
      }
      :host([variant="rect"]) .bone {
        height: 4rem;
        border-radius: var(--wk-radius);
      }
      :host([variant="circle"]) .bone {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
      }
      @keyframes shimmer {
        0% {
          background-position: 100% 0;
        }
        100% {
          background-position: -100% 0;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .bone {
          animation: none;
        }
      }
    `,
  ];

  render() {
    const style = [
      this.width ? `width:${this.width}` : "",
      this.height ? `height:${this.height}` : "",
    ]
      .filter(Boolean)
      .join(";");
    return html`<span
      class="bone"
      style=${style}
      aria-hidden="true"
    ></span>`;
  }
}

defineElement("wk-skeleton", WkSkeleton);

declare global {
  interface HTMLElementTagNameMap {
    "wk-skeleton": WkSkeleton;
  }
}
