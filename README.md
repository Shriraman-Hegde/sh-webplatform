# sh-webplatform (webkit)

Shared **Lit** UI component library. Developed with [open-wc](https://github.com/open-wc/open-wc) + [Storybook.js](https://storybook.js.org/), published as versioned **npm + CDN** artifacts.

Plan: [`docs/plans/2026-11-26-2144-feature-webkit-lit-storybook-cdn-plan.md`](docs/plans/2026-11-26-2144-feature-webkit-lit-storybook-cdn-plan.md)

## Scope (current)

**In:** Lit web components (host-owned kit: base element, tokens, registry, icon context), Storybook, Rollup publish (ESM + CDN), the `wk` CLI, the webkit MCP server, and the sample consumer for install proof.

**Out for now:** microfrontends, entity-ref / discovery service, Helm charts, JSON form renderer, cross-app routing.

## Packages

- `@sh-webplatform/webkit` — components, themes, Workbench composition demo, Storybook
- `@sh-webplatform/webkit-cli` — `wk` terminal lookup for components, icons, and theme setup
- `webkit-mcp` — the same lookup for an agent
- `sample-consumer` — install/theme proof harness (+ `cdn-proof.html`)

## Quick start

```bash
pnpm install
pnpm --filter @sh-webplatform/webkit test          # open-wc Web Test Runner
pnpm --filter @sh-webplatform/webkit build         # open-wc building-rollup
pnpm --filter @sh-webplatform/webkit start         # @web/dev-server demo/
pnpm --filter @sh-webplatform/webkit storybook
pnpm exec wk component get wk-data-grid
pnpm --filter webkit-mcp dev
pnpm --filter sample-consumer dev
```

Layout, the component set, and how to style a shadow root: [`packages/webkit/STRUCTURE.md`](packages/webkit/STRUCTURE.md).

Tag, attributes, events, and an HTML example for each element live in `packages/webkit/src/catalog.ts`. Storybook, `wk`, and the MCP server all read that file.

## Themes

Put `data-theme`, `data-mode`, and `data-motion` on the document element.

- Looks: `default`, `warm`, `slate`, `forest`
- Modes: `day`, `night`
- Motion: `system`, `on`, `off`

```ts
import "@sh-webplatform/webkit/themes.css";
import { bootstrapWebkit, defaultIconLibrary } from "@sh-webplatform/webkit";

bootstrapWebkit({
  theme: "default",
  mode: "day",
  motion: "system",
  icons: defaultIconLibrary,
});
```
