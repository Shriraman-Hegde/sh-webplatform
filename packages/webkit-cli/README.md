# webkit CLI

Look up `wk-*` elements, icon names, and theme setup from the terminal. The answers come from the same catalog the webkit MCP server uses.

From the repo root:

```bash
pnpm install
pnpm exec wk component list
pnpm exec wk component get wk-data-grid
pnpm exec wk component get wk-date-field
pnpm exec wk component example wk-combobox
pnpm exec wk icon list
pnpm exec wk icon get search
pnpm exec wk theme show
```

Add `--json` for machine-readable output. `wk --help` lists commands. `wk component --help`, `wk icon --help`, and `wk theme --help` list that command only.

The text comes from `packages/webkit/src/catalog.ts`. Icon names come from `@sh-webplatform/icons` plus `packages/webkit/src/icons/app-icons.ts` (`search`, `calendar`, `eye`, `eye-off`, and the rest of that file). Theme text is the same `themeGuide` object.

```bash
pnpm --filter @sh-webplatform/webkit-cli test
```
