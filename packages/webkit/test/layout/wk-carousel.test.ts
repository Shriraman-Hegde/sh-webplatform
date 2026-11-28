import { expect, fixture, html } from "@open-wc/testing";
import "../../src/components/layout/wk-carousel/index.js";
import type { WkCarousel } from "../../src/components/layout/wk-carousel/index.js";

describe("wk-carousel", () => {
  it("advances to the next slide", async () => {
    const el = await fixture<WkCarousel>(html`
      <wk-carousel
        .items=${[
          { id: "one", title: "First" },
          { id: "two", title: "Second" },
        ]}
      ></wk-carousel>
    `);
    (el.shadowRoot?.querySelector("[aria-label='Next slide']") as HTMLButtonElement).click();
    await el.updateComplete;
    expect(el.index).to.equal(1);
    expect(el.shadowRoot?.textContent).to.include("Second");
  });
});
