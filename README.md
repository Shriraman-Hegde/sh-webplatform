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

Set `data-theme` to `finance` or `manufacturing` on `:root` (or use `applyTheme()`).

## Ownership

Small core publishes releases until a platform team exists. Department apps consume the package; they do not fork component source.
