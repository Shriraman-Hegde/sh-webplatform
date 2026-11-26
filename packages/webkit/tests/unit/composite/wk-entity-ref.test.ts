import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  clearRegistry,
  configureRegistry,
} from "../../../src/registry/index.js";
import "../../../src/components/composite/wk-entity-ref/index.js";
import type { WkEntityRef } from "../../../src/components/composite/wk-entity-ref/index.js";

describe("wk-entity-ref", () => {
  beforeEach(() => {
    configureRegistry([
      {
        entity: "collateral",
        routeTemplate: "/collateral/{id}",
        label: "Collateral",
      },
    ]);
  });

  afterEach(() => {
    clearRegistry();
    document.body.replaceChildren();
  });

  it("renders a link when the entity is registered", async () => {
    const el = document.createElement("wk-entity-ref") as WkEntityRef;
    el.entity = "collateral";
    el.entityId = "COL-77";
    document.body.appendChild(el);
    await el.updateComplete;
    const anchor = el.shadowRoot?.querySelector("a");
    expect(anchor?.getAttribute("href")).toBe("/collateral/COL-77");
    expect(anchor?.textContent?.trim()).toBe("COL-77");
  });

  it("renders disabled text when unresolved", async () => {
    const el = document.createElement("wk-entity-ref") as WkEntityRef;
    el.entity = "unknown";
    el.entityId = "X-1";
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector("a")).toBeNull();
    const span = el.shadowRoot?.querySelector("span.disabled");
    expect(span?.getAttribute("aria-disabled")).toBe("true");
    expect(span?.textContent?.trim()).toBe("X-1");
  });
});
