import { expect, fixture, html } from "@open-wc/testing";
import "../../src/components/layout/wk-split/index.js";
import type { WkSplit } from "../../src/components/layout/wk-split/index.js";

describe("wk-split", () => {
  it("projects the two panes", async () => {
    const el = await fixture<WkSplit>(html`
      <wk-split position="40">
        <span slot="primary">Left</span>
        <span slot="secondary">Right</span>
      </wk-split>
    `);
    const primary = el.shadowRoot?.querySelector("slot[name=primary]") as HTMLSlotElement;
    const secondary = el.shadowRoot?.querySelector("slot[name=secondary]") as HTMLSlotElement;
    expect(primary.assignedNodes({ flatten: true })[0]?.textContent).to.equal("Left");
    expect(secondary.assignedNodes({ flatten: true })[0]?.textContent).to.equal("Right");
    expect(el.position).to.equal(40);
  });
});
