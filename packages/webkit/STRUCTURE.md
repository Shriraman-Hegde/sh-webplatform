# Webkit package layout

Follows [open-wc](https://github.com/open-wc/open-wc) practices for Lit web components.

**Scope:** component library only (no MFE, discovery, or Helm in this package).

## Kit layers (host-owned)

| Layer | Path | Role |
|-------|------|------|
| Design tokens | `src/themes/`, `src/theme/` | CSS custom properties + `data-theme` / `data-mode` |
| Shadow CSS | `src/styles/` | `bootstrap.css` on every element; one sheet per component in `styles/components/` |
| Element registry | `src/registry/` | `defineElement` — define each `wk-*` once |
| Base element | `src/base/wk-element.ts` | Shared host styles, `dir`/`lang`, icon access |
| Lit context | `src/context/` | Icon library (host sets via `bootstrapWebkit` / provider) |
| Boot | `src/bootstrap.ts` | Host calls once: theme + mode + icons |
| Icons (sister) | [`@sh-webplatform/icons`](https://github.com/Shriraman-Hegde/sh-webplatform-icons) | SVG → Lit `sh-icon-*` + `iconRegistry` — not vendored here |

## Toolchain (open-wc)

| Concern | Tool |
|---------|------|
| Dev server | `@web/dev-server` (`pnpm start` → `demo/`) |
| Tests | `@web/test-runner` + `@open-wc/testing` (real Chromium) |
| Build | `@open-wc/building-rollup` (`createBasicConfig`) → ESM + CDN |
| Lint | ESLint + `eslint-plugin-lit` / `eslint-plugin-wc` |
| Workshop | Storybook Docs (SC WebKit-style): **Overview** = preview + Attributes + Show code; variant stories for in-depth |

## Naming

- Custom elements: `wk-<kebab-name>` (tag + class folder).
- Component folders: `src/components/<category>/wk-<name>/`
- Categories: `form` | `layout` | `composite`
- Files inside a component folder:
  - `wk-<name>.ts` — implementation (extends `WkElement`)
  - `index.ts` — public barrel for that component
- Themes: kebab-case **look** ids on `data-theme` — never product/industry labels.
  - Looks: `default` | `warm` | `slate` | `forest`
  - Modes: `day` | `night` on `data-mode` (surfaces; independent of look)
  - Host boot: `bootstrapWebkit({ theme, mode?, motion, icons? })` — mode defaults to `day`; icons & motion optional; registry from `@sh-webplatform/icons` when used
  - Controls: `size="sm|md|lg"`; icons via optional props (`icon`, `show-icon`, `show-icons`); motion via `animated` + `data-motion`
  - Rich text is optional on `wk-textarea` via `rich` (and optional `show-icons`)

## Trees

| Tree | Purpose |
|------|---------|
| `src/components/` | Source only (no tests, no stories) |
| `src/base/` | Shared base element |
| `src/context/` | Lit context (icons) |
| `src/registry/` | Safe customElements.define |
| `src/theme/` / `src/themes/` | Theme helpers + CSS tokens |
| `demo/` | Buildless open-wc demo via web-dev-server |
| `stories/<category>/` | Storybook stories (mirrored categories) |
| `test/<category>/` | Browser tests via Web Test Runner (separate from `src/`) |
| `src/catalog.ts` | Tag, summary, attributes, events, and HTML example for every element |
| `src/components/form/field-notes.ts` | Shared `hint` / `message` markup for form fields |
| `src/styles/components/wk-field-notes.css` | Shared hint, message, and error color rules |

## Where to read a component

| Surface | What it shows |
|---------|----------------|
| Storybook | Rendered element, attributes, and the story source |
| `src/catalog.ts` | The text the CLI and MCP return |
| `pnpm exec wk component get <tag>` | That catalog entry in the terminal |
| MCP `get-component` | The same entry for an agent |

`wk-data-table` paints `columns` and `rows` and does not sort or filter. `wk-data-grid` does. A header click emits `wk-sort` with `{ key, direction }`. A filter field emits `wk-filter` with `{ key, value, filters }`. The column manager emits `wk-columns` with `{ columns, hidden }`: `columns` is the visible keys in order, `hidden` is the hidden keys. Page changes stay on `wk-pagination`.

## Form fields

`wk-text-field`, `wk-number-field`, `wk-password-field`, `wk-search-field`, `wk-combobox`, `wk-slider`, `wk-file-drop`, `wk-date-field`, `wk-time-field`, `wk-pin-field`, `wk-color-field`, and `wk-tag-field` share this contract:

| Attribute | Role |
|-----------|------|
| `name` | Form name. `wk-pin-field` submits one value. `wk-tag-field` submits the tags joined by commas. |
| `size` | `sm`, `md`, or `lg`. Sets the control height through the bootstrap tokens. |
| `hint` | Helper text under the control |
| `message` | Status or error text under the hint |
| `disabled` | Disables the control |
| `error` | Marks the control invalid and colors `message` with the danger token |

`wk-number-field` snaps a typed value to `step`, then clamps it to `min` and `max`. `wk-search-field` emits `wk-input` while typing and `wk-search` on submit. `wk-file-drop` drops files that do not match `accept`.

`wk-select` and `wk-combobox` take `placement` and `hoist`. Select placement is `bottom`, `top`, `start`, or `end`. Combobox placement is `bottom` or `top`. `hoist` paints the list on the top layer. Arrow keys move, Enter chooses, Escape closes.

`wk-date-field` keeps `value` as `YYYY-MM-DD`. The calendar icon sits inside the field (`icon-position` is `start` or `end`, default `end`) and opens `wk-calendar` in a popover (`part=picker`). On the calendar, single arrows move a month, double arrows move a year, and the month and year labels open lists so you can jump. `wk-calendar` is also a standalone month grid.

`wk-password-field` uses `eye` and `eye-off`. `wk-search-field` uses `search`. `wk-date-field` uses `calendar`. The calendar’s year step uses `chevrons-left` and `chevrons-right`. Those SVGs live in `@sh-webplatform/icons`. The same glyphs are also in `src/icons/app-icons.ts` so the kit still draws them before that package is installed again.

## Elements

### `form/`

`wk-button`, `wk-text-field`, `wk-textarea`, `wk-select`, `wk-checkbox`, `wk-switch`, `wk-radio-group`, `wk-number-field`, `wk-password-field`, `wk-search-field`, `wk-combobox`, `wk-slider`, `wk-file-drop`, `wk-date-field`, `wk-time-field`, `wk-pin-field`, `wk-color-field`, `wk-tag-field`

### `layout/`

`wk-card`, `wk-page-shell`, `wk-data-table`, `wk-data-grid`, `wk-status-banner`, `wk-badge`, `wk-divider`, `wk-spinner`, `wk-dialog`, `wk-icon`, `wk-alert`, `wk-link`, `wk-tabs`, `wk-accordion`, `wk-progress`, `wk-breadcrumbs`, `wk-tooltip`, `wk-skeleton`, `wk-pagination`, `wk-drawer`, `wk-menu`, `wk-toast`, `wk-avatar`, `wk-avatar-group`, `wk-empty`, `wk-chip`, `wk-popover`, `wk-toolbar`, `wk-side-nav`, `wk-top-bar`, `wk-menubar`, `wk-segmented`, `wk-skip-link`, `wk-steps`, `wk-stack`, `wk-split`, `wk-scroll-area`, `wk-list`, `wk-description-list`, `wk-tree`, `wk-timeline`, `wk-sticky`, `wk-context-menu`, `wk-command-palette`, `wk-hover-card`, `wk-meter`, `wk-rating`, `wk-banner`, `wk-inline-message`, `wk-stat`, `wk-kbd`, `wk-code`, `wk-calendar`, `wk-carousel`

### `composite/`

`wk-workbench` — Storybook composition of the kit. Not a control an app page should copy into a form.

## Shadow root

Every `wk-*` element renders inside an open shadow root. The component stylesheet is adopted there. A page rule cannot select the inner button or input.

Customize with:

- `--wk-*` tokens, which inherit into the shadow tree
- `::part()` on the named hooks, such as `wk-button::part(control)`, `wk-text-field::part(control)`, `wk-card::part(surface)`, `wk-dialog::part(panel)`, `wk-data-grid::part(table)`, `wk-date-field::part(picker)`
- slots for the app's own content

`data-motion="off"` sets `--wk-motion` to `0`.
