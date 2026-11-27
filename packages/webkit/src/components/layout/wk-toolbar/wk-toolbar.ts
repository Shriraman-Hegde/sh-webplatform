import { html, nothing } from "lit";
import { cssText } from "../../../styles/css.js";
import wkStyles from "../../../styles/components/wk-toolbar.css";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";

export class WkToolbar extends WkElement {
  static properties = {
    label: { type: String },
  };

  declare label: string;

  constructor() {
    super();
    this.label = "";
  }

  static styles = [WkElement.styles, cssText(wkStyles)];

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener("keydown", this.onKey);
  }

  override disconnectedCallback(): void {
    this.removeEventListener("keydown", this.onKey);
    super.disconnectedCallback();
  }

  private controls(): HTMLElement[] {
    return [...this.querySelectorAll<HTMLElement>("wk-button, button")].filter(
      (item) => !item.hasAttribute("disabled"),
    );
  }

  private onKey = (event: KeyboardEvent): void => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    const items = this.controls();
    if (items.length === 0) return;
    const path = event.composedPath();
    const index = items.findIndex((item) => path.includes(item));
    if (index < 0) return;
    event.preventDefault();
    const next =
      event.key === "ArrowRight"
        ? items[(index + 1) % items.length]
        : items[(index - 1 + items.length) % items.length];
    next?.focus();
  };

  render() {
    return html`
      <div class="bar" part="bar" role="toolbar" aria-label=${this.label || nothing}>
        <slot></slot>
      </div>
    `;
  }
}

defineElement("wk-toolbar", WkToolbar);

declare global {
  interface HTMLElementTagNameMap {
    "wk-toolbar": WkToolbar;
  }
}
