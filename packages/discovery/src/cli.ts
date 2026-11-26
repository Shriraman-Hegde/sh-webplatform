import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { DiscoveryCatalog } from "./catalog.js";
import { createDiscoveryServer } from "./server.js";
import { loadDescriptorsFromDir } from "./sources/file-source.js";

const here = fileURLToPath(new URL(".", import.meta.url));
const defaultFixtures = resolve(here, "../fixtures");

async function main(): Promise<void> {
  const port = Number(process.env.PORT ?? "8787");
  const fixturesDir = resolve(process.env.DISCOVERY_FIXTURES_DIR ?? defaultFixtures);

  const catalog = new DiscoveryCatalog();
  const descriptors = await loadDescriptorsFromDir(fixturesDir);
  catalog.replaceAll(descriptors);

  const server = createDiscoveryServer(catalog);
  server.listen(port, () => {
    console.log(
      `[discovery] listening on http://127.0.0.1:${port} (fixtures: ${fixturesDir}, modules: ${descriptors.length})`,
    );
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
