# sh-webplatform (webkit)

Shared **Lit** UI component library. Developed with [open-wc](https://github.com/open-wc/open-wc) + [Storybook.js](https://storybook.js.org/), published as versioned **npm + CDN** artifacts.

Plan: [`docs/plans/2026-11-26-2144-feature-webkit-lit-storybook-cdn-plan.md`](docs/plans/2026-11-26-2144-feature-webkit-lit-storybook-cdn-plan.md)

## Scope (current)

**In:** Lit web components (host-owned kit: base element, tokens, registry, icon context), Storybook, Rollup publish (ESM + CDN), sample consumer for install proof.

**Out for now:** microfrontends, entity-ref / discovery service, Helm charts, JSON form renderer, cross-app routing.

## Packages

- `@sh-webplatform/webkit` — components, themes, Workbench composition demo, Storybook
- `sample-consumer` — install/theme proof harness (+ `cdn-proof.html`)

## Quick start

```bash
pnpm install
pnpm --filter @sh-webplatform/webkit test          # open-wc Web Test Runner
pnpm --filter @sh-webplatform/webkit build         # open-wc building-rollup
pnpm --filter @sh-webplatform/webkit start         # @web/dev-server demo/
pnpm --filter @sh-webplatform/webkit storybook
pnpm --filter sample-consumer dev
```

Layout & naming: [`packages/webkit/STRUCTURE.md`](packages/webkit/STRUCTURE.md)

## Themes

Set `data-theme` to `default` or `warm` on `:root` (or use `applyTheme()`). Theme ids are look names (kebab-case), not product/industry labels.
