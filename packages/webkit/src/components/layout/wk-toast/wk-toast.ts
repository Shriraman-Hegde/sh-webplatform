import { html } from "lit";
import { cssText } from "../../../styles/css.js";
import wkStyles from "../../../styles/components/wk-toast.css";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";
import "../wk-icon/index.js";

const toneIcon: Record<string, string> = {
  info: "info",
  success: "check",
  warning: "warn",
  danger: "error",
};

export class WkToast extends WkElement {
  static properties = {
    open: { type: Boolean, reflect: true },
    tone: { type: String, reflect: true },
    duration: { type: Number },
  };

  declare open: boolean;
  declare tone: "info" | "success" | "warning" | "danger";
  declare duration: number;

  #timer = 0;

  constructor() {
    super();
    this.open = false;
    this.tone = "info";
    this.duration = 4000;
  }

  static styles = [WkElement.styles, cssText(wkStyles)];

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.clearTimeout(this.#timer);
  }

  protected updated(changed: Map<string, unknown>): void {
    if (!changed.has("open") && !changed.has("duration")) return;
    window.clearTimeout(this.#timer);
    if (!this.open || this.duration <= 0) return;
    this.#timer = window.setTimeout(() => this.close(), this.duration);
  }

  private close(): void {
    if (!this.open) return;
    this.open = false;
    this.dispatchEvent(
      new CustomEvent("wk-close", { bubbles: true, composed: true }),
    );
  }

  render() {
    const alert = this.tone === "danger" || this.tone === "warning";
    return html`
      <div role=${alert ? "alert" : "status"}>
        <wk-icon name=${toneIcon[this.tone] ?? "info"} size="sm"></wk-icon>
        <p><slot></slot></p>
        <button type="button" aria-label="Dismiss" @click=${this.close}>
          <wk-icon name="close" size="sm"></wk-icon>
        </button>
      </div>
    `;
  }
}

defineElement("wk-toast", WkToast);

declare global {
  interface HTMLElementTagNameMap {
    "wk-toast": WkToast;
  }
}
