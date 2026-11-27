import { html, type TemplateResult } from "lit";

const svg = (content: TemplateResult) =>
  html`<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    ${content}
  </svg>`;

/** App glyphs the kit adds on top of `@sh-webplatform/icons`. */
export const appIcons: Record<string, () => TemplateResult> = {
  calendar: () =>
    svg(
      html`<rect x="3" y="5" width="18" height="16" rx="2"></rect>
        <path d="M3 10h18M8 3v4M16 3v4"></path>`,
    ),
  filter: () => svg(html`<path d="M4 5h16l-6 7v6l-4 2v-8z"></path>`),
  download: () => svg(html`<path d="M12 4v10M8 10l4 4 4-4M5 19h14"></path>`),
  upload: () => svg(html`<path d="M12 16V6M8 10l4-4 4 4M5 19h14"></path>`),
  copy: () =>
    svg(
      html`<rect x="8" y="8" width="12" height="12" rx="2"></rect>
        <path d="M4 16V5a1 1 0 0 1 1-1h11"></path>`,
    ),
  eye: () =>
    svg(
      html`<path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6S2 12 2 12z"></path>
        <circle cx="12" cy="12" r="3"></circle>`,
    ),
  "eye-off": () =>
    svg(
      html`<path
        d="M3 3l18 18M10.6 10.6a3 3 0 0 0 4.2 4.2M9.9 5.1A10 10 0 0 1 12 5c6 0 10 7 10 7a18 18 0 0 1-3.2 4.1M6.1 6.1C3.6 8 2 12 2 12a18 18 0 0 0 6.1 5.2"
      ></path>`,
    ),
  mail: () =>
    svg(
      html`<rect x="3" y="5" width="18" height="14" rx="2"></rect>
        <path d="m3 7 9 7 9-7"></path>`,
    ),
  bell: () =>
    svg(
      html`<path d="M6 9a6 6 0 1 1 12 0c0 7 2 7 2 7H4s2 0 2-7"></path>
        <path d="M10 19a2 2 0 0 0 4 0"></path>`,
    ),
  file: () =>
    svg(
      html`<path
          d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"
        ></path>
        <path d="M14 3v5h5"></path>`,
    ),
  folder: () =>
    svg(
      html`<path
        d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
      ></path>`,
    ),
  lock: () =>
    svg(
      html`<rect x="5" y="11" width="14" height="10" rx="2"></rect>
        <path d="M8 11V8a4 4 0 0 1 8 0v3"></path>`,
    ),
  refresh: () =>
    svg(
      html`<path d="M21 12a9 9 0 1 1-2.6-6.3L21 8"></path>
        <path d="M21 3v5h-5"></path>`,
    ),
  clock: () =>
    svg(
      html`<circle cx="12" cy="12" r="9"></circle>
        <path d="M12 7v6l4 2"></path>`,
    ),
  phone: () =>
    svg(
      html`<path
        d="M6 3h4l2 5-3 2a12 12 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 4 5a2 2 0 0 1 2-2z"
      ></path>`,
    ),
};

export const appIconNames = Object.keys(appIcons);
