import { css, html } from "lit";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";

export class WkSkeleton extends WkElement {
  static properties = {
    variant: { type: String, reflect: true },
    size: { type: String, reflect: true },
    width: { type: String },
    height: { type: String },
    animated: { type: Boolean, reflect: true },
  };

  declare variant: "text" | "rect" | "circle";
  declare size: "sm" | "md" | "lg";
  declare width: string;
  declare height: string;
  declare animated: boolean;

  constructor() {
    super();
    this.variant = "text";
    this.size = "md";
    this.width = "100%";
    this.height = "";
    this.animated = true;
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
      }
      :host([animated]) .bone {
        animation: shimmer 1.2s ease-in-out infinite;
      }
      :host([variant="text"]) .bone,
      :host(:not([variant])) .bone {
        height: 0.85rem;
        border-radius: 999px;
      }
      :host([size="sm"][variant="text"]) .bone,
      :host([size="sm"]:not([variant])) .bone {
        height: 0.65rem;
      }
      :host([size="lg"][variant="text"]) .bone,
      :host([size="lg"]:not([variant])) .bone {
        height: 1rem;
      }
      :host([variant="rect"]) .bone {
        height: 4rem;
        border-radius: var(--wk-radius);
      }
      :host([size="sm"][variant="rect"]) .bone {
        height: 2.5rem;
      }
      :host([size="lg"][variant="rect"]) .bone {
        height: 5.5rem;
      }
      :host([variant="circle"]) .bone {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
      }
      :host([size="sm"][variant="circle"]) .bone {
        width: 1.75rem;
        height: 1.75rem;
      }
      :host([size="lg"][variant="circle"]) .bone {
        width: 3.25rem;
        height: 3.25rem;
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
        :host([animated]) .bone {
          animation: none;
        }
      }
      :host-context([data-motion="off"]) .bone {
        animation: none !important;
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
