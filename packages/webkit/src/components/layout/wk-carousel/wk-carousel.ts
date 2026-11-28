import { html } from "lit";
import { cssText } from "../../../styles/css.js";
import wkStyles from "../../../styles/components/wk-carousel.css";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";
import "../wk-icon/index.js";

export type WkCarouselItem = { id: string; title: string; text?: string };

export class WkCarousel extends WkElement {
  static properties = {
    items: { attribute: false },
    index: { type: Number },
    label: { type: String },
  };

  declare items: WkCarouselItem[];
  declare index: number;
  declare label: string;

  constructor() {
    super();
    this.items = [];
    this.index = 0;
    this.label = "Slides";
  }

  static styles = [WkElement.styles, cssText(wkStyles)];

  private go(delta: number): void {
    if (this.items.length === 0) return;
    this.index = (this.index + delta + this.items.length) % this.items.length;
    this.dispatchEvent(
      new CustomEvent("wk-change", {
        detail: { index: this.index, id: this.items[this.index]?.id },
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    const item = this.items[this.index];
    return html`
      <section part="frame" aria-roledescription="carousel" aria-label=${this.label}>
        <div aria-live="polite">
          ${item
            ? html`<h3>${item.title}</h3><p>${item.text ?? ""}</p>`
            : html`<p>No slides</p>`}
        </div>
        <div class="controls">
          <button type="button" aria-label="Previous slide" @click=${() => this.go(-1)}>
            <wk-icon name="chevron-left" size="sm"></wk-icon>
          </button>
          <span>${this.items.length ? this.index + 1 : 0} / ${this.items.length}</span>
          <button type="button" aria-label="Next slide" @click=${() => this.go(1)}>
            <wk-icon name="chevron-right" size="sm"></wk-icon>
          </button>
        </div>
      </section>
    `;
  }
}

defineElement("wk-carousel", WkCarousel);

declare global {
  interface HTMLElementTagNameMap {
    "wk-carousel": WkCarousel;
  }
}
