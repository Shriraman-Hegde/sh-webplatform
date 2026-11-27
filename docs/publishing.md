# Publishing webkit

Package: `@sh-webplatform/webkit`

## Artifacts

| Artifact | Path | Notes |
| --- | --- | --- |
| ESM (npm) | `dist/webkit.esm.js` | `lit` external (peerDependency) |
| CDN IIFE | `dist/webkit.cdn.min.js` | `lit` bundled |
| Themes | `dist/themes.css` | Looks `default` / `warm` / `slate` / `forest` on `data-theme`; surfaces `day` / `night` on `data-mode` |

Version identity is the npm version. CDN example:

`https://cdn.jsdelivr.net/npm/@sh-webplatform/webkit@0.1.0/dist/webkit.cdn.min.js`

## Storybook (GitHub Pages)

Static build uses `base: /sh-webplatform/`.

Expected URL after Pages deploy:

`https://shriraman-hegde.github.io/sh-webplatform/`

## Local release proof without npm credentials

```bash
pnpm --filter @sh-webplatform/webkit build
pnpm --filter @sh-webplatform/webkit pack
```

Install the tarball into `sample-consumer` (or another app) and run its build.
See `packages/sample-consumer/README.md` and `cdn-proof.html`.
