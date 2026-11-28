import { html } from "lit";
import { cssText } from "../../../styles/css.js";
import wkStyles from "../../../styles/components/wk-icon.css";
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
    fill: { type: String },
    stroke: { type: String },
  };

  declare name: string;
  declare label: string;
  declare size: "sm" | "md" | "lg";
  declare fill: string;
  declare stroke: string;

  constructor() {
    super();
    this.name = "";
    this.label = "";
    this.size = "md";
    this.fill = "";
    this.stroke = "";
  }

  static styles = [
    WkElement.styles,
    cssText(wkStyles),
  ];

  protected updated(): void {
    const svg = this.renderRoot.querySelector("svg");
    if (!(svg instanceof SVGElement)) return;
    this.paint(svg, "fill", this.fill);
    this.paint(svg, "stroke", this.stroke);
  }

  private paint(svg: SVGElement, property: "fill" | "stroke", value: string): void {
    if (value) svg.style[property] = value;
    else svg.style.removeProperty(property);
  }

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
