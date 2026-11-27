import { expect, fixture, html } from "@open-wc/testing";
import "../../src/components/layout/wk-breadcrumbs/index.js";
import type { WkBreadcrumbs } from "../../src/components/layout/wk-breadcrumbs/index.js";

describe("wk-breadcrumbs", () => {
  it("marks the last crumb as current page", async () => {
    const el = await fixture<WkBreadcrumbs>(html`
      <wk-breadcrumbs
        .items=${[
          { label: "Home", href: "#" },
          { label: "ITEM-A" },
        ]}
      ></wk-breadcrumbs>
    `);
    const current = el.shadowRoot?.querySelector('[aria-current="page"]');
    expect(current?.textContent?.trim()).to.equal("ITEM-A");
    await expect(el).to.be.accessible();
  });
});
