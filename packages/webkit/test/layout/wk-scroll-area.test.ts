import { expect, fixture, html } from "@open-wc/testing";
import "../../src/components/layout/wk-scroll-area/index.js";
import type { WkScrollArea } from "../../src/components/layout/wk-scroll-area/index.js";

describe("wk-scroll-area", () => {
  it("limits the viewport height", async () => {
    const el = await fixture<WkScrollArea>(html`<wk-scroll-area max-height="8rem"><p>Long</p></wk-scroll-area>`);
    const viewport = el.shadowRoot?.querySelector("[part=viewport]") as HTMLElement;
    expect(viewport.style.maxHeight).to.equal("8rem");
  });
});
