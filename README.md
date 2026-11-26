# sh-webplatform (webkit)

Shared **Lit** UI library developed in [Storybook.js](https://storybook.js.org/), published as versioned **npm + CDN** artifacts, proven by a sample consumer.

Plan: [`docs/plans/2026-11-26-2144-feature-webkit-lit-storybook-cdn-plan.md`](docs/plans/2026-11-26-2144-feature-webkit-lit-storybook-cdn-plan.md)

## Packages

- `@sh-webplatform/webkit` — components, themes, Workbench demo, Storybook
- `sample-consumer` — install/theme proof harness (+ `cdn-proof.html`)

## Quick start

```bash
pnpm install
pnpm --filter @sh-webplatform/webkit test
pnpm --filter @sh-webplatform/webkit build
pnpm --filter @sh-webplatform/webkit storybook
pnpm --filter sample-consumer dev
```

## Themes

Set `data-theme` to `default` or `warm` on `:root` (or use `applyTheme()`). Theme ids are look names (kebab-case), not product/industry labels.

## Entity refs

```ts
import { configureRegistry } from "@sh-webplatform/webkit";

configureRegistry([
  { entity: "collateral", routeTemplate: "/collateral/{id}", label: "Collateral" },
]);
```

Then `<wk-entity-ref entity="collateral" entity-id="COL-77"></wk-entity-ref>` renders a deep link. Unknown entities degrade to disabled text. A discovery service can replace the static registry later without changing the component API.

## Ownership

Small core publishes releases until a platform team exists. Department apps consume the package; they do not fork component source.
