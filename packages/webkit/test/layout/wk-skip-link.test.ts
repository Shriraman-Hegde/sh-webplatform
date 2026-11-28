import { expect, fixture, html } from "@open-wc/testing";
import "../../src/components/layout/wk-skip-link/index.js";

describe("wk-skip-link", () => {
  it("points at the content target", async () => {
    const el = await fixture(html`<wk-skip-link href="#main"></wk-skip-link>`);
    const link = el.shadowRoot?.querySelector("a");
    expect(link?.getAttribute("href")).to.equal("#main");
    expect(link?.textContent).to.equal("Skip to content");
  });
});
