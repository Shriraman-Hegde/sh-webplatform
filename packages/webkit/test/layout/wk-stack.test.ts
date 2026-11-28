import { expect, fixture, html } from "@open-wc/testing";
import "../../src/components/layout/wk-stack/index.js";
import type { WkStack } from "../../src/components/layout/wk-stack/index.js";

describe("wk-stack", () => {
  it("projects children into the stack", async () => {
    const el = await fixture<WkStack>(html`<wk-stack orientation="horizontal"><span>One</span><span>Two</span></wk-stack>`);
    expect(el.getAttribute("orientation")).to.equal("horizontal");
    const slot = el.shadowRoot?.querySelector("slot") as HTMLSlotElement;
    expect(slot.assignedNodes({ flatten: true }).map((node) => node.textContent).join("")).to.equal("OneTwo");
  });
});
