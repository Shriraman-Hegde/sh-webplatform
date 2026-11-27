import { html } from "lit";
import { cssText } from "../../../styles/css.js";
import wkStyles from "../../../styles/components/wk-card.css";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";

export class WkCard extends WkElement {
  static properties = {
    heading: { type: String },
  };

  declare heading: string;

  private actionsOpen = false;

  constructor() {
    super();
    this.heading = "";
  }

  static styles = [WkElement.styles, cssText(wkStyles)];

  private onActions(event: Event): void {
    const slot = event.target as HTMLSlotElement;
    const open = slot.assignedNodes({ flatten: true }).some((node) => {
      return node.nodeType !== Node.TEXT_NODE || Boolean(node.textContent?.trim());
    });
    if (open === this.actionsOpen) return;
    this.actionsOpen = open;
    this.requestUpdate();
  }

  render() {
    return html`
      <div class="surface" part="surface">
        ${this.heading ? html`<h2>${this.heading}</h2>` : null}
        <div class="body"><slot></slot></div>
        <div class="actions" ?hidden=${!this.actionsOpen}>
          <slot name="actions" @slotchange=${this.onActions}></slot>
        </div>
      </div>
    `;
  }
}

defineElement("wk-card", WkCard);

declare global {
  interface HTMLElementTagNameMap {
    "wk-card": WkCard;
  }
}
