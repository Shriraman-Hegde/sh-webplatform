import { expect, fixture, html } from "@open-wc/testing";
import "../../src/components/layout/wk-stat/index.js";

describe("wk-stat", () => {
  it("renders the figure and change", async () => {
    const el = await fixture(html`<wk-stat label="Open" value="12" change="+2" trend="up"></wk-stat>`);
    expect(el.shadowRoot?.querySelector("strong")?.textContent).to.equal("12");
    expect(el.shadowRoot?.textContent).to.include("+2");
    expect(el.getAttribute("trend")).to.equal("up");
  });
});
