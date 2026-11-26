# sample-consumer

Proof harness for `@sh-webplatform/webkit` (R7).

## Workspace (dev)

```bash
pnpm install
pnpm --filter sample-consumer dev
```

## Pack / npm install proof

```bash
pnpm --filter @sh-webplatform/webkit build
pnpm --filter @sh-webplatform/webkit pack
# install the resulting tarball into another app, or temporarily point package.json
# at the tarball path, then:
pnpm --filter sample-consumer build
```

## CDN proof

1. Publish `@sh-webplatform/webkit@0.1.0` (or update the version in `cdn-proof.html`).
2. Serve `cdn-proof.html` over HTTP.
3. Confirm Workbench renders and the theme select updates `data-theme`.
