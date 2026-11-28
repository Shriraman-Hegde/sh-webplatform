import { expect, fixture, html } from "@open-wc/testing";
import "../../src/components/layout/wk-top-bar/index.js";
import type { WkTopBar } from "../../src/components/layout/wk-top-bar/index.js";

describe("wk-top-bar", () => {
  it("renders the title and named slots", async () => {
    const el = await fixture<WkTopBar>(html`
      <wk-top-bar title="Records">
        <span slot="start">Menu</span>
        <span slot="end">Account</span>
      </wk-top-bar>
    `);
    expect(el.shadowRoot?.querySelector("h1")?.textContent).to.equal("Records");
    const start = el.shadowRoot?.querySelector("slot[name=start]") as HTMLSlotElement;
    expect(start.assignedNodes({ flatten: true }).map((node) => node.textContent?.trim()).join("")).to.equal("Menu");
  });
});
