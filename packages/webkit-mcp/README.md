# webkit MCP

Lookup server for the kit. An agent building an app can ask which `wk-*` elements exist, how to use one, which icon names are valid, and how to set look, day or night, and motion.

Tools: `list-components`, `get-component`, `list-icons`, `get-theme`.

## Getting Started

From the repo root:

```bash
pnpm install
pnpm --filter webkit-mcp dev
```

Open [http://localhost:3000/mcp/inspector](http://localhost:3000/mcp/inspector) to try a tool.

You can start building by editing the entry file. Add tools, resources, and prompts — the server auto-reloads as you edit.

Open [http://localhost:3000/mcp](http://localhost:3000/mcp) in a browser to see the landing page. Edit `landing.tsx` to change it (Tailwind classes work with no extra setup), or delete it to use the built-in page.

Run `npm run typecheck` to refresh MCP view types and check the project with its local TypeScript compiler.

## Learn More

To learn more about mcp-use and MCP:

- [mcp-use Documentation](https://mcp-use.com/docs/typescript/getting-started/quickstart) — guides, API reference, and tutorials

## Deploy on Manufact Cloud

```bash
npm run deploy
```
