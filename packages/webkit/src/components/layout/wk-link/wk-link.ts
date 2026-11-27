import { css, html, nothing } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { WkElement } from "../../../base/index.js";
import { defineElement } from "../../../registry/index.js";

export class WkLink extends WkElement {
  static properties = {
    href: { type: String },
    target: { type: String },
    disabled: { type: Boolean, reflect: true },
  };

  declare href: string;
  declare target: string;
  declare disabled: boolean;

  constructor() {
    super();
    this.href = "#";
    this.target = "";
    this.disabled = false;
  }

  static styles = [
    WkElement.styles,
    css`
      :host {
        display: inline;
      }
      a {
        color: var(--wk-accent);
        text-decoration: underline;
        text-underline-offset: 0.12em;
        font: inherit;
      }
      a:focus-visible {
        outline: none;
        box-shadow: var(--wk-focus);
        border-radius: 2px;
      }
      :host([disabled]) a {
        color: var(--wk-muted);
        pointer-events: none;
        text-decoration: none;
        cursor: not-allowed;
      }
    `,
  ];

  render() {
    return html`
      <a
        href=${this.disabled ? nothing : this.href}
        target=${ifDefined(this.target || undefined)}
        rel=${this.target === "_blank" ? "noopener noreferrer" : nothing}
        aria-disabled=${this.disabled ? "true" : "false"}
        tabindex=${this.disabled ? -1 : 0}
      >
        <slot></slot>
      </a>
    `;
  }
}

defineElement("wk-link", WkLink);

declare global {
  interface HTMLElementTagNameMap {
    "wk-link": WkLink;
  }
}
