import { expect, fixture, html } from "@open-wc/testing";
import "../../src/components/layout/wk-skeleton/index.js";
import type { WkSkeleton } from "../../src/components/layout/wk-skeleton/index.js";

describe("wk-skeleton", () => {
  it("renders an aria-hidden placeholder", async () => {
    const el = await fixture<WkSkeleton>(
      html`<wk-skeleton variant="rect" width="10rem" height="3rem"></wk-skeleton>`,
    );
    const bone = el.shadowRoot?.querySelector(".bone");
    expect(bone).to.exist;
    expect(bone?.getAttribute("aria-hidden")).to.equal("true");
    expect(el.variant).to.equal("rect");
  });
});
