import { expect, fixture, html } from "@open-wc/testing";
import "../../src/components/layout/wk-inline-message/index.js";

describe("wk-inline-message", () => {
  it("projects the message", async () => {
    const el = await fixture(html`<wk-inline-message tone="danger">Title is required.</wk-inline-message>`);
    const message = el.shadowRoot?.querySelector("[part=message]");
    expect(message?.getAttribute("role")).to.equal("alert");
    const slot = message?.querySelector("slot") as HTMLSlotElement;
    expect(slot.assignedNodes({ flatten: true }).map((node) => node.textContent?.trim()).join("")).to.equal("Title is required.");
  });
});
