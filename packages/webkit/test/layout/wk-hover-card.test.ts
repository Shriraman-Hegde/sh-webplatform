import { aTimeout, expect, fixture, html } from "@open-wc/testing";
import "../../src/components/layout/wk-hover-card/index.js";
import type { WkHoverCard } from "../../src/components/layout/wk-hover-card/index.js";

describe("wk-hover-card", () => {
  it("opens after the trigger receives focus", async () => {
    const el = await fixture<WkHoverCard>(html`<wk-hover-card label="Ada"><p>Platform</p></wk-hover-card>`);
    (el.shadowRoot?.querySelector("button") as HTMLButtonElement).dispatchEvent(new FocusEvent("focus"));
    await aTimeout(200);
    await el.updateComplete;
    expect(el.open).to.equal(true);
    const slot = el.shadowRoot?.querySelector("slot") as HTMLSlotElement;
    expect(slot.assignedNodes({ flatten: true }).map((node) => node.textContent?.trim()).join("")).to.equal("Platform");
  });
});
