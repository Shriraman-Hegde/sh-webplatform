import { afterEach, describe, expect, it } from "vitest";
import type { Server } from "node:http";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { DiscoveryCatalog } from "../../src/catalog.js";
import { createDiscoveryServer } from "../../src/server.js";
import { loadDescriptorsFromDir } from "../../src/sources/file-source.js";

const fixtures = resolve(
  fileURLToPath(new URL("../../fixtures", import.meta.url)),
);

describe("discovery server", () => {
  let server: Server | undefined;

  afterEach(async () => {
    await new Promise<void>((resolveClose) => {
      if (!server) {
        resolveClose();
        return;
      }
      server.close(() => resolveClose());
    });
    server = undefined;
  });

  it("serves entities and components from fixtures", async () => {
    const catalog = new DiscoveryCatalog();
    catalog.replaceAll(await loadDescriptorsFromDir(fixtures));
    server = createDiscoveryServer(catalog);
    await new Promise<void>((resolveListen) => {
      server!.listen(0, "127.0.0.1", () => resolveListen());
    });
    const addr = server.address();
    if (!addr || typeof addr === "string") {
      throw new Error("expected TCP address");
    }
    const base = `http://127.0.0.1:${addr.port}`;

    const entities = await fetch(`${base}/discovery/entities`).then((r) =>
      r.json(),
    );
    const components = await fetch(`${base}/discovery/components`).then((r) =>
      r.json(),
    );
    const one = await fetch(`${base}/discovery/entities/collateral`).then((r) =>
      r.json(),
    );

    expect(entities.entities.map((e: { type: string }) => e.type).sort()).toEqual(
      ["borrower", "collateral", "facility"],
    );
    expect(
      components.components.map((c: { tag: string }) => c.tag).sort(),
    ).toEqual(["bor-summary", "col-summary", "fac-summary"]);
    expect(one.entity.routeTemplate).toBe("/collateral/{id}");
  });
});
