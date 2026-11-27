import { html } from "lit";
import { cssText } from "../../../styles/css.js";
import wkStyles from "../../../styles/components/wk-chip.css";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";

export class WkChip extends WkElement {
  static properties = {
    variant: { type: String, reflect: true },
    removable: { type: Boolean, reflect: true },
  };

  declare variant: "neutral" | "accent";
  declare removable: boolean;

  constructor() {
    super();
    this.variant = "neutral";
    this.removable = false;
  }

  static styles = [WkElement.styles, cssText(wkStyles)];

  private onRemove(): void {
    this.dispatchEvent(
      new CustomEvent("wk-remove", { bubbles: true, composed: true }),
    );
  }

  render() {
    return html`
      <span class="chip" part="chip">
        <slot></slot>
        ${this.removable
          ? html`<button type="button" part="remove" aria-label="Remove" @click=${this.onRemove}>
              ×
            </button>`
          : null}
      </span>
    `;
  }
}

defineElement("wk-chip", WkChip);

declare global {
  interface HTMLElementTagNameMap {
    "wk-chip": WkChip;
  }
}
