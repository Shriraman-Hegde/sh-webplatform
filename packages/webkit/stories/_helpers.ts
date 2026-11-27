import { html, type TemplateResult } from "lit";

/** Shared chrome for Overview stories (all options on one page). */
export function overviewPage(
  title: string,
  usage: string,
  sections: Array<{ heading: string; body: TemplateResult }>,
): TemplateResult {
  return html`
    <div style="padding:1.25rem 1.5rem;max-width:56rem;display:grid;gap:1.5rem">
      <header style="display:grid;gap:0.5rem">
        <h1 style="margin:0;font:700 1.35rem/1.2 var(--wk-font-sans);color:var(--wk-ink)">
          ${title}
        </h1>
        <p style="margin:0;color:var(--wk-muted);font-size:0.92rem">
          All options on one page. Open
          <strong>Playground</strong> in the sidebar for in-depth Controls.
        </p>
      </header>

      <section style="display:grid;gap:0.5rem">
        <h2 style="margin:0;font:700 0.95rem/1.3 var(--wk-font-sans)">Usage</h2>
        <pre
          style="margin:0;padding:0.85rem 1rem;border-radius:var(--wk-radius);border:1px solid var(--wk-border);background:var(--wk-surface);overflow:auto;font:0.8rem/1.45 ui-monospace,SFMono-Regular,Menlo,monospace;color:var(--wk-ink);white-space:pre-wrap"
        ><code>${usage.trim()}</code></pre>
      </section>

      ${sections.map(
        (s) => html`
          <section style="display:grid;gap:0.75rem">
            <h2 style="margin:0;font:700 0.95rem/1.3 var(--wk-font-sans)">${s.heading}</h2>
            ${s.body}
          </section>
        `,
      )}
    </div>
  `;
}

export function row(...nodes: TemplateResult[]): TemplateResult {
  return html`<div
    style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center"
  >
    ${nodes}
  </div>`;
}

export function stack(...nodes: TemplateResult[]): TemplateResult {
  return html`<div style="display:grid;gap:0.75rem;max-width:28rem">${nodes}</div>`;
}

export const docs = (componentMarkdown: string) => ({
  docs: {
    description: { component: componentMarkdown.trim() },
    source: { type: "code" as const },
  },
});
