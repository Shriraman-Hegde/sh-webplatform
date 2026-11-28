# webkit MCP

Lookup server for the kit. An agent building an app can ask which `wk-*` elements exist, how to use one, which icon names are valid, and how to set look, day or night, and motion.

Tools: `list-components`, `get-component`, `list-icons`, `get-theme`.

`get-component` takes a tag such as `wk-data-grid` or `wk-date-field` and returns the summary, attributes, events, and HTML example. `list-components` returns every tag. Both read `packages/webkit/src/catalog.ts`. `list-icons` includes the app glyphs in `packages/webkit/src/icons/app-icons.ts`. `get-theme` returns looks, modes, motion, and the `bootstrapWebkit` setup.

## Getting Started

From the repo root:

```bash
pnpm install
pnpm --filter webkit-mcp dev
```

Open [http://localhost:3000/mcp/inspector](http://localhost:3000/mcp/inspector) to call a tool. The server reloads when `index.ts` changes.

## Learn More

To learn more about mcp-use and MCP:

- [mcp-use Documentation](https://mcp-use.com/docs/typescript/getting-started/quickstart) — guides, API reference, and tutorials

## Deploy on Manufact Cloud

```bash
npm run deploy
```
