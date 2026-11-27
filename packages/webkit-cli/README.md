# webkit CLI

Look up `wk-*` elements, icon names, and theme setup from the terminal. The answers come from the same catalog the webkit MCP server uses.

From the repo root:

```bash
pnpm install
pnpm exec wk component list
pnpm exec wk component get wk-drawer
pnpm exec wk component example wk-button
pnpm exec wk icon list
pnpm exec wk icon get calendar
pnpm exec wk theme show
```

Add `--json` for machine-readable output. `wk --help` lists commands. `wk component --help`, `wk icon --help`, and `wk theme --help` list that command only.

```bash
pnpm --filter @sh-webplatform/webkit-cli test
```
