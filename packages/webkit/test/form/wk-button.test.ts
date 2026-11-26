import { expect, fixture, html } from "@open-wc/testing";
import "../../src/components/form/wk-button/index.js";
import type { WkButton } from "../../src/components/form/wk-button/index.js";

describe("wk-button", () => {
  it("renders a native button with a default slot", async () => {
    const el = await fixture<WkButton>(html`<wk-button>Save</wk-button>`);
    const button = el.shadowRoot?.querySelector("button");
    const slot = el.shadowRoot?.querySelector("slot");

    expect(button).to.exist;
    expect(slot).to.exist;

    const assigned = (slot as HTMLSlotElement).assignedNodes({ flatten: true });
    expect(assigned.map((n) => n.textContent?.trim()).join("")).to.include(
      "Save",
    );
  });

  it("is accessible", async () => {
    const el = await fixture<WkButton>(
      html`<wk-button variant="primary">Save</wk-button>`,
    );
    await expect(el).to.be.accessible();
  });
});
