import { html } from "lit";
import { cssText } from "../../../styles/css.js";
import wkStyles from "../../../styles/components/wk-hover-card.css";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";

export class WkHoverCard extends WkElement {
  static properties = {
    label: { type: String },
    open: { type: Boolean, reflect: true },
  };

  declare label: string;
  declare open: boolean;
  private timer = 0;

  constructor() {
    super();
    this.label = "Details";
    this.open = false;
  }

  static styles = [WkElement.styles, cssText(wkStyles)];

  override disconnectedCallback(): void {
    window.clearTimeout(this.timer);
    super.disconnectedCallback();
  }

  private schedule(open: boolean): void {
    window.clearTimeout(this.timer);
    this.timer = window.setTimeout(() => { this.open = open; }, open ? 150 : 80);
  }

  render() {
    return html`
      <button
        type="button"
        part="trigger"
        aria-expanded=${this.open ? "true" : "false"}
        @mouseenter=${() => this.schedule(true)}
        @mouseleave=${() => this.schedule(false)}
        @focus=${() => this.schedule(true)}
        @blur=${() => this.schedule(false)}
      >${this.label}</button>
      <div class="card" part="card" ?hidden=${!this.open} @mouseenter=${() => this.schedule(true)} @mouseleave=${() => this.schedule(false)}>
        <slot></slot>
      </div>
    `;
  }
}

defineElement("wk-hover-card", WkHoverCard);

declare global {
  interface HTMLElementTagNameMap {
    "wk-hover-card": WkHoverCard;
  }
}
