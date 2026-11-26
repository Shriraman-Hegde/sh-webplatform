# Webkit package layout

## Naming

- Custom elements: `wk-<kebab-name>` (tag + class folder).
- Component folders: `src/components/<category>/wk-<name>/`
- Categories: `form` | `layout` | `composite`
- Files inside a component folder:
  - `wk-<name>.ts` — implementation
  - `index.ts` — public barrel for that component
- Themes: kebab-case **look** ids on `data-theme` — never product/industry labels.
  - Current: `default` | `warm`
  - Apply with `applyTheme("default" | "warm")` or `document.documentElement.dataset.theme`
- Entity refs: `<wk-entity-ref entity="…" entity-id="…">` resolves via `configureRegistry([{ entity, routeTemplate }])` (`{id}` in template). Unresolved/restricted refs render as disabled text.

## Trees

| Tree | Purpose |
|------|---------|
| `src/components/` | Source only (no tests, no stories) |
| `src/theme/` | Theme helpers |
| `src/themes/` | Theme CSS tokens |
| `stories/<category>/` | Storybook stories (mirrored categories) |
| `tests/unit/<category>/` | Unit tests (mirrored categories) |

## Build

Primary bundler is **Rollup** (`rollup.config.mjs`): ESM library + CDN IIFE.
Storybook uses Vite only as its Storybook framework runner.
