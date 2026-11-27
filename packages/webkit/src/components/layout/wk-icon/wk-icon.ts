import { css, html } from "lit";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";

/**
 * Renders a named glyph from the host icon library (`bootstrapWebkit` / Lit context).
 * Falls back to the `name` text when the library has no entry.
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
        line-height: 1;
        color: inherit;
      }
      .glyph {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
      }
      :host([size="sm"]) .glyph {
        font-size: 0.85rem;
        width: 1rem;
        height: 1rem;
      }
      :host([size="md"]) .glyph,
      :host(:not([size])) .glyph {
        font-size: 1rem;
        width: 1.25rem;
        height: 1.25rem;
      }
      :host([size="lg"]) .glyph {
        font-size: 1.35rem;
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
