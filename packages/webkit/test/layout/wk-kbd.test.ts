import { expect, fixture, html } from "@open-wc/testing";
import "../../src/components/layout/wk-kbd/index.js";

describe("wk-kbd", () => {
  it("projects the key label", async () => {
    const el = await fixture(html`<wk-kbd>K</wk-kbd>`);
    const slot = el.shadowRoot?.querySelector("slot") as HTMLSlotElement;
    expect(slot.assignedNodes({ flatten: true }).map((node) => node.textContent).join("")).to.equal("K");
  });
});
