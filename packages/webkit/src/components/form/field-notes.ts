import { html, nothing, type TemplateResult } from "lit";

export const fieldChromeProperties = {
  name: { type: String },
  disabled: { type: Boolean, reflect: true },
  error: { type: Boolean, reflect: true },
  size: { type: String, reflect: true },
  hint: { type: String },
  message: { type: String },
};

export type FieldChrome = {
  name: string;
  disabled: boolean;
  error: boolean;
  size: "sm" | "md" | "lg";
  hint: string;
  message: string;
};

export function initFieldChrome(host: FieldChrome): void {
  host.name = "";
  host.disabled = false;
  host.error = false;
  host.size = "md";
  host.hint = "";
  host.message = "";
}

export function describedBy(host: Pick<FieldChrome, "hint" | "message">) {
  const ids = [host.hint ? "hint" : "", host.message ? "message" : ""].filter(Boolean).join(" ");
  return ids || nothing;
}

export function fieldNotes(host: Pick<FieldChrome, "hint" | "message">): TemplateResult {
  return html`
    ${host.hint ? html`<p id="hint" class="hint">${host.hint}</p>` : nothing}
    ${host.message ? html`<p id="message" class="message">${host.message}</p>` : nothing}
  `;
}
