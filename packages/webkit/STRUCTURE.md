# Webkit package layout

Follows [open-wc](https://github.com/open-wc/open-wc) practices for Lit web components.

**Scope:** component library only (no MFE, discovery, or Helm in this package).

## Kit layers (host-owned)

| Layer | Path | Role |
|-------|------|------|
| Design tokens | `src/themes/`, `src/theme/` | CSS custom properties + `data-theme` |
| Element registry | `src/registry/` | `defineElement` — define each `wk-*` once |
| Base element | `src/base/wk-element.ts` | Shared host styles, `dir`/`lang`, icon access |
| Lit context | `src/context/` | Icon library (host sets via `bootstrapWebkit` / provider) |
| Boot | `src/bootstrap.ts` | Host calls once: theme + icons |
| Icons (sister) | [`@sh-webplatform/icons`](https://github.com/Shriraman-Hegde/sh-webplatform-icons) | SVG → Lit `sh-icon-*` + `iconRegistry` — not vendored here |

## Toolchain (open-wc)

| Concern | Tool |
|---------|------|
| Dev server | `@web/dev-server` (`pnpm start` → `demo/`) |
| Tests | `@web/test-runner` + `@open-wc/testing` (real Chromium) |
| Build | `@open-wc/building-rollup` (`createBasicConfig`) → ESM + CDN |
| Lint | ESLint + `eslint-plugin-lit` / `eslint-plugin-wc` |
| Workshop | Storybook (open-wc “demoing” track) |

## Naming

- Custom elements: `wk-<kebab-name>` (tag + class folder).
- Component folders: `src/components/<category>/wk-<name>/`
- Categories: `form` | `layout` | `composite`
- Files inside a component folder:
  - `wk-<name>.ts` — implementation (extends `WkElement`)
  - `index.ts` — public barrel for that component
- Themes: kebab-case **look** ids on `data-theme` — never product/industry labels.
  - Current: `default` | `warm`
  - Host boot: `bootstrapWebkit({ theme, motion, icons? })` — icons & motion optional; registry from `@sh-webplatform/icons` when used
  - Controls: `size="sm|md|lg"`; icons via optional props (`icon`, `show-icon`, `show-icons`); motion via `animated` + `data-motion`

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
