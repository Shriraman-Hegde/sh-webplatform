# Webkit package layout

Follows [open-wc](https://github.com/open-wc/open-wc) practices for Lit web components.

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
  - `wk-<name>.ts` — implementation
  - `index.ts` — public barrel for that component
- Themes: kebab-case **look** ids on `data-theme` — never product/industry labels.
  - Current: `default` | `warm`
  - Apply with `applyTheme("default" | "warm")`

## Trees

| Tree | Purpose |
|------|---------|
| `src/components/` | Source only (no tests, no stories) |
| `src/theme/` | Theme helpers |
| `src/themes/` | Theme CSS tokens |
| `demo/` | Buildless open-wc demo via web-dev-server |
| `stories/<category>/` | Storybook stories (mirrored categories) |
| `test/<category>/` | Browser tests via Web Test Runner (separate from `src/`) |
