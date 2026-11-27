import { html } from "lit";
import { cssText } from "../../../styles/css.js";
import wkStyles from "../../../styles/components/wk-skeleton.css";
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
    cssText(wkStyles),
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
