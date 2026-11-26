import { afterEach, describe, expect, it } from "vitest";
import {
  clearRegistry,
  configureRegistry,
  resolveEntity,
} from "../../../src/registry/index.js";

describe("registry", () => {
  afterEach(() => {
    clearRegistry();
  });

  it("resolves a registered entity route", () => {
    configureRegistry([
      {
        entity: "Collateral",
        routeTemplate: "/collateral/{id}",
        label: "Collateral",
      },
    ]);
    expect(resolveEntity("collateral", "COL-77")).toEqual({
      entity: "collateral",
      id: "COL-77",
      href: "/collateral/COL-77",
      label: "Collateral",
    });
  });

  it("returns undefined for unknown or incomplete refs", () => {
    configureRegistry([
      { entity: "facility", routeTemplate: "/facilities/{id}" },
    ]);
    expect(resolveEntity("borrower", "B-1")).toBeUndefined();
    expect(resolveEntity("facility", "")).toBeUndefined();
    expect(resolveEntity("", "X")).toBeUndefined();
  });
});
