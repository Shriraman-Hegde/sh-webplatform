import { expect, fixture, html } from "@open-wc/testing";
import "../../src/components/layout/wk-sticky/index.js";

describe("wk-sticky", () => {
  it("offsets the pinned bar", async () => {
    const el = await fixture(html`<wk-sticky offset="2rem"><span>Tools</span></wk-sticky>`);
    const bar = el.shadowRoot?.querySelector("[part=bar]") as HTMLElement;
    expect(bar.style.top).to.equal("2rem");
  });
});
