# sh-webplatform

Shared **Lit** UI library (webkit) plus **UI component discovery** for cross-module ERP MFEs.

Plans:

- [`docs/plans/2026-11-26-2144-feature-webkit-lit-storybook-cdn-plan.md`](docs/plans/2026-11-26-2144-feature-webkit-lit-storybook-cdn-plan.md)
- [`docs/plans/2026-11-26-2221-feature-ui-component-discovery-plan.md`](docs/plans/2026-11-26-2221-feature-ui-component-discovery-plan.md)

## Packages / charts

- `@sh-webplatform/webkit` — Lit components, themes, Workbench, Storybook (no baked-in demo entity routes)
- `@sh-webplatform/discovery` — aggregates module descriptors; serves `/discovery/entities` and `/discovery/components`
- `sample-consumer` — webkit install/theme proof harness
- `charts/sh-module-base` — Helm library chart that emits labeled discovery ConfigMaps

## Quick start

```bash
pnpm install
pnpm --filter @sh-webplatform/webkit test
pnpm --filter @sh-webplatform/webkit build
pnpm --filter @sh-webplatform/discovery test
pnpm --filter @sh-webplatform/discovery build
pnpm --filter @sh-webplatform/discovery start
pnpm --filter @sh-webplatform/webkit storybook
pnpm --filter sample-consumer dev
```

## Themes

Set `data-theme` to `default` or `warm` on `:root` (or use `applyTheme()`). Theme ids are look names (kebab-case), not product/industry labels.

## Discovery

Modules publish descriptors (entities + UI components) via Helm. Locally, discovery loads `packages/discovery/fixtures`. Entity-ref UI belongs **after** discovery — not inside webkit demo seeds.

## Ownership

Small core publishes releases until a platform team exists. Department apps consume packages; they do not fork component source.
