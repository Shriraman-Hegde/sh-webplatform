import { css, html } from "lit";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";

/**
 * Renders a named glyph from the host icon library (`bootstrapWebkit` / Lit context).
 * Prefers SVG TemplateResults from `@sh-webplatform/icons`; falls back to text.
 */
export class WkIcon extends WkElement {
  static properties = {
    name: { type: String, reflect: true },
    label: { type: String },
    size: { type: String, reflect: true },
  };

  declare name: string;
  declare label: string;
  declare size: "sm" | "md" | "lg";

  constructor() {
    super();
    this.name = "";
    this.label = "";
    this.size = "md";
  }

  static styles = [
    WkElement.styles,
    css`
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        line-height: 0;
        color: inherit;
        flex-shrink: 0;
      }
      .glyph {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1.25rem;
        height: 1.25rem;
      }
      .glyph > svg,
      .glyph ::slotted(svg) {
        width: 100%;
        height: 100%;
        display: block;
      }
      :host([size="sm"]) .glyph {
        width: 1rem;
        height: 1rem;
      }
      :host([size="md"]) .glyph,
      :host(:not([size])) .glyph {
        width: 1.25rem;
        height: 1.25rem;
      }
      :host([size="lg"]) .glyph {
        width: 1.6rem;
        height: 1.6rem;
      }
    `,
  ];

  render() {
    const glyph = this.icons.get(this.name) ?? this.name;
    const label = this.label || this.name;
    return this.label
      ? html`<span class="glyph" role="img" aria-label=${this.label} title=${label}
          >${glyph}</span
        >`
      : html`<span class="glyph" aria-hidden="true" title=${label}>${glyph}</span>`;
  }
}

defineElement("wk-icon", WkIcon);

declare global {
  interface HTMLElementTagNameMap {
    "wk-icon": WkIcon;
  }
}
