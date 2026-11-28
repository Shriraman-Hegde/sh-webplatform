import { expect, fixture, html } from "@open-wc/testing";
import "../../src/components/layout/wk-banner/index.js";
import type { WkBanner } from "../../src/components/layout/wk-banner/index.js";

describe("wk-banner", () => {
  it("dismisses and emits wk-close", async () => {
    const el = await fixture<WkBanner>(html`<wk-banner heading="Notice" dismissible>Tonight</wk-banner>`);
    let closed = false;
    el.addEventListener("wk-close", () => { closed = true; });
    (el.shadowRoot?.querySelector("button") as HTMLButtonElement).click();
    await el.updateComplete;
    expect(closed).to.equal(true);
    expect(el.open).to.equal(false);
    expect(el.shadowRoot?.textContent).to.not.include("Tonight");
  });
});
