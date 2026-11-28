import { html } from "lit";
import { cssText } from "../../../styles/css.js";
import wkStyles from "../../../styles/components/wk-steps.css";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";

export type WkStep = { id: string; label: string };

export class WkSteps extends WkElement {
  static properties = {
    steps: { attribute: false },
    active: { type: String },
  };

  declare steps: WkStep[];
  declare active: string;

  constructor() {
    super();
    this.steps = [];
    this.active = "";
  }

  static styles = [WkElement.styles, cssText(wkStyles)];

  private choose(id: string): void {
    this.active = id;
    this.dispatchEvent(new CustomEvent("wk-change", { detail: { id }, bubbles: true, composed: true }));
  }

  render() {
    const activeIndex = Math.max(0, this.steps.findIndex((step) => step.id === this.active));
    return html`
      <ol part="list">
        ${this.steps.map((step, index) => {
          const state = index < activeIndex ? "done" : index === activeIndex ? "current" : "upcoming";
          return html`
            <li data-state=${state}>
              <button type="button" aria-current=${state === "current" ? "step" : "false"} @click=${() => this.choose(step.id)}>
                <span class="index">${index + 1}</span>
                ${step.label}
              </button>
            </li>
          `;
        })}
      </ol>
    `;
  }
}

defineElement("wk-steps", WkSteps);

declare global {
  interface HTMLElementTagNameMap {
    "wk-steps": WkSteps;
  }
}
