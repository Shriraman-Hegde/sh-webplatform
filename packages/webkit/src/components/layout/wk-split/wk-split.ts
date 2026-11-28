import { html } from "lit";
import { cssText } from "../../../styles/css.js";
import wkStyles from "../../../styles/components/wk-split.css";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";

export class WkSplit extends WkElement {
  static properties = {
    position: { type: Number },
  };

  declare position: number;

  constructor() {
    super();
    this.position = 50;
  }

  static styles = [WkElement.styles, cssText(wkStyles)];

  private drag = (event: PointerEvent): void => {
    const bounds = this.getBoundingClientRect();
    if (!bounds.width) return;
    const next = Math.min(80, Math.max(20, ((event.clientX - bounds.left) / bounds.width) * 100));
    this.position = Math.round(next);
    this.dispatchEvent(new CustomEvent("wk-change", { detail: { position: this.position }, bubbles: true, composed: true }));
  };

  private stop = (): void => {
    window.removeEventListener("pointermove", this.drag);
    window.removeEventListener("pointerup", this.stop);
  };

  private start(event: PointerEvent): void {
    event.preventDefault();
    window.addEventListener("pointermove", this.drag);
    window.addEventListener("pointerup", this.stop);
  }

  override disconnectedCallback(): void {
    this.stop();
    super.disconnectedCallback();
  }

  render() {
    return html`
      <div class="split" part="split" style="grid-template-columns: ${this.position}% 0.5rem 1fr">
        <div class="pane"><slot name="primary"></slot></div>
        <button type="button" part="divider" aria-label="Resize panes" @pointerdown=${this.start}></button>
        <div class="pane"><slot name="secondary"></slot></div>
      </div>
    `;
  }
}

defineElement("wk-split", WkSplit);

declare global {
  interface HTMLElementTagNameMap {
    "wk-split": WkSplit;
  }
}
