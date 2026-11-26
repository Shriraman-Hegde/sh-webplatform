import { LitElement, css, html } from "lit";

export class WkPageShell extends LitElement {
  static properties = {
    pageTitle: { type: String, attribute: "page-title" },
    subtitle: { type: String },
  };

  declare pageTitle: string;
  declare subtitle: string;

  constructor() {
    super();
    this.pageTitle = "Workbench";
    this.subtitle = "";
  }

  static styles = css`
    :host {
      display: block;
      min-height: 100%;
      font-family: var(--wk-font-sans);
      color: var(--wk-ink);
      background: var(--wk-bg);
    }
    header {
      display: flex;
      align-items: end;
      justify-content: space-between;
      gap: var(--wk-space-4);
      padding: var(--wk-space-6);
      border-bottom: 1px solid var(--wk-border);
      background: color-mix(in srgb, var(--wk-surface) 88%, transparent);
    }
    h1 {
      margin: 0;
      font-size: 1.6rem;
      letter-spacing: -0.02em;
    }
    p {
      margin: var(--wk-space-1) 0 0;
      color: var(--wk-muted);
    }
    .actions {
      display: flex;
      gap: var(--wk-space-2);
      align-items: center;
    }
    main {
      padding: var(--wk-space-6);
      display: grid;
      gap: var(--wk-space-6);
    }
  `;

  render() {
    return html`
      <header>
        <div>
          <h1>${this.pageTitle}</h1>
          ${this.subtitle ? html`<p>${this.subtitle}</p>` : null}
        </div>
        <div class="actions"><slot name="actions"></slot></div>
      </header>
      <main><slot></slot></main>
    `;
  }
}

customElements.define("wk-page-shell", WkPageShell);

declare global {
  interface HTMLElementTagNameMap {
    "wk-page-shell": WkPageShell;
  }
}
