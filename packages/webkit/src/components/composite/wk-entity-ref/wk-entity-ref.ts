import { LitElement, css, html, nothing } from "lit";
import { resolveEntity } from "../../../registry/index.js";

export class WkEntityRef extends LitElement {
  static properties = {
    entity: { type: String },
    entityId: { type: String, attribute: "entity-id" },
    label: { type: String },
    allowed: { type: Boolean },
  };

  declare entity: string;
  declare entityId: string;
  declare label: string;
  declare allowed: boolean;

  constructor() {
    super();
    this.entity = "";
    this.entityId = "";
    this.label = "";
    this.allowed = true;
  }

  static styles = css`
    :host {
      display: inline;
      font: inherit;
      color: inherit;
    }
    a {
      color: var(--wk-accent, #0b6e99);
      text-decoration: underline;
      text-underline-offset: 0.12em;
    }
    a:focus-visible {
      outline: none;
      box-shadow: var(--wk-focus);
      border-radius: 2px;
    }
    .disabled {
      color: var(--wk-muted, #5b6b7c);
      cursor: not-allowed;
    }
  `;

  render() {
    const resolved = resolveEntity(this.entity, this.entityId);
    const text = this.label || resolved?.id || this.entityId || nothing;

    if (!resolved || !this.allowed) {
      return html`<span
        class="disabled"
        aria-disabled="true"
        title=${resolved ? "Access restricted" : "Unknown entity"}
        >${text}</span
      >`;
    }

    return html`<a
      href=${resolved.href}
      data-entity=${resolved.entity}
      >${text}</a
    >`;
  }
}

customElements.define("wk-entity-ref", WkEntityRef);

declare global {
  interface HTMLElementTagNameMap {
    "wk-entity-ref": WkEntityRef;
  }
}
