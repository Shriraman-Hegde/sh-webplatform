import { expect, fixture, html } from "@open-wc/testing";
import "../../src/components/layout/wk-description-list/index.js";

describe("wk-description-list", () => {
  it("renders term and detail pairs", async () => {
    const el = await fixture(html`
      <wk-description-list .items=${[{ term: "Owner", detail: "Ada" }]}></wk-description-list>
    `);
    expect(el.shadowRoot?.querySelector("dt")?.textContent).to.equal("Owner");
    expect(el.shadowRoot?.querySelector("dd")?.textContent).to.equal("Ada");
  });
});
