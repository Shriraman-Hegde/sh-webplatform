import { expect, fixture, html } from "@open-wc/testing";
import "../../src/components/layout/wk-meter/index.js";

describe("wk-meter", () => {
  it("exposes the current value", async () => {
    const el = await fixture(html`<wk-meter label="Storage" value="72" max="100"></wk-meter>`);
    const meter = el.shadowRoot?.querySelector("[role=meter]");
    expect(meter?.getAttribute("aria-valuenow")).to.equal("72");
    expect(meter?.getAttribute("data-tone")).to.equal("high");
  });
});
