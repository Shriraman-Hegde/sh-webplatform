import { expect, fixture, html } from "@open-wc/testing";
import "../../src/components/layout/wk-rating/index.js";
import type { WkRating } from "../../src/components/layout/wk-rating/index.js";

describe("wk-rating", () => {
  it("selects a score", async () => {
    const el = await fixture<WkRating>(html`<wk-rating label="Quality" value="1" max="5"></wk-rating>`);
    const stars = [...(el.shadowRoot?.querySelectorAll("button") ?? [])] as HTMLButtonElement[];
    stars[3].click();
    await el.updateComplete;
    expect(el.value).to.equal(4);
    expect(stars[3].getAttribute("aria-checked")).to.equal("true");
  });
});
