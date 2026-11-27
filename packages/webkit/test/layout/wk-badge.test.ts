import { expect, fixture, html } from "@open-wc/testing";
import "../../src/components/layout/wk-badge/index.js";
import type { WkBadge } from "../../src/components/layout/wk-badge/index.js";

describe("wk-badge", () => {
  it("renders slotted content with tone", async () => {
    const el = await fixture<WkBadge>(
      html`<wk-badge tone="accent">Live</wk-badge>`,
    );
    expect(el.getAttribute("tone")).to.equal("accent");
    await expect(el).to.be.accessible();
  });
});
