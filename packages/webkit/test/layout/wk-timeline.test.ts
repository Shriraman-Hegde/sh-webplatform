import { expect, fixture, html } from "@open-wc/testing";
import "../../src/components/layout/wk-timeline/index.js";

describe("wk-timeline", () => {
  it("renders events in order", async () => {
    const el = await fixture(html`
      <wk-timeline .items=${[{ id: "open", title: "Opened", time: "2026-11-28" }]}></wk-timeline>
    `);
    expect(el.shadowRoot?.querySelector("time")?.getAttribute("datetime")).to.equal("2026-11-28");
    expect(el.shadowRoot?.textContent).to.include("Opened");
  });
});
