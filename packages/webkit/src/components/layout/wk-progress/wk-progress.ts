import { css, html } from "lit";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";

export class WkProgress extends WkElement {
  static properties = {
    value: { type: Number },
    max: { type: Number },
    label: { type: String },
  };

  declare value: number;
  declare max: number;
  declare label: string;

  constructor() {
    super();
    this.value = 0;
    this.max = 100;
    this.label = "";
  }

  static styles = [
    WkElement.styles,
    css`
      :host {
        display: grid;
        gap: var(--wk-space-2);
      }
      .meta {
        display: flex;
        justify-content: space-between;
        gap: var(--wk-space-3);
        font-size: 0.85rem;
        color: var(--wk-muted);
      }
      .track {
        height: 0.55rem;
        border-radius: 999px;
        background: var(--wk-border);
        overflow: hidden;
      }
      .fill {
        height: 100%;
        border-radius: inherit;
        background: var(--wk-accent);
        transition: width 160ms ease;
      }
      @media (prefers-reduced-motion: reduce) {
        .fill {
          transition: none;
        }
      }
    `,
  ];

  private get percent(): number {
    if (this.max <= 0) return 0;
    return Math.max(0, Math.min(100, (this.value / this.max) * 100));
  }

  render() {
    const pct = Math.round(this.percent);
    return html`
      <div class="meta">
        <span>${this.label}</span>
        <span>${pct}%</span>
      </div>
      <div
        class="track"
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax=${this.max}
        aria-valuenow=${this.value}
        aria-label=${this.label || "Progress"}
      >
        <div class="fill" style="width:${this.percent}%"></div>
      </div>
    `;
  }
}

defineElement("wk-progress", WkProgress);

declare global {
  interface HTMLElementTagNameMap {
    "wk-progress": WkProgress;
  }
}
