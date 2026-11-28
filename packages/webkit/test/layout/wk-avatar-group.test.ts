import { expect, fixture, html } from "@open-wc/testing";
import "../../src/components/layout/wk-avatar-group/index.js";

describe("wk-avatar-group", () => {
  it("collapses people past the max", async () => {
    const el = await fixture(html`
      <wk-avatar-group
        max="1"
        .items=${[{ label: "Ada Lovelace" }, { label: "Grace Hopper" }]}
      ></wk-avatar-group>
    `);
    expect(el.shadowRoot?.textContent).to.include("AL");
    expect(el.shadowRoot?.querySelector(".more")?.textContent).to.equal("+1");
  });
});
