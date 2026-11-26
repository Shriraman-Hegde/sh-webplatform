import { describe, expect, it } from "vitest";
import { DiscoveryCatalog } from "../../src/catalog.js";

describe("DiscoveryCatalog", () => {
  it("indexes entities and components by module", () => {
    const catalog = new DiscoveryCatalog();
    catalog.replaceAll([
      {
        module: "Collateral",
        routePrefix: "/collateral",
        entities: [
          {
            type: "Collateral",
            routeTemplate: "/collateral/{id}",
            label: "Collateral",
          },
        ],
        components: [
          {
            tag: "col-summary",
            version: "0.1.0",
            kind: "summary",
          },
        ],
      },
    ]);

    expect(catalog.resolveEntity("collateral")?.routeTemplate).toBe(
      "/collateral/{id}",
    );
    expect(catalog.listComponents()).toHaveLength(1);
    expect(catalog.listModules()[0]?.module).toBe("collateral");
  });
});
