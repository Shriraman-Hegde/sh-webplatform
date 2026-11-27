import { expect, fixture, html } from "@open-wc/testing";
import "../../src/components/layout/wk-progress/index.js";
import type { WkProgress } from "../../src/components/layout/wk-progress/index.js";

describe("wk-progress", () => {
  it("exposes progressbar semantics and percent", async () => {
    const el = await fixture<WkProgress>(
      html`<wk-progress value="25" max="100" label="Upload"></wk-progress>`,
    );
    const bar = el.shadowRoot?.querySelector('[role="progressbar"]');
    expect(bar).to.exist;
    expect(bar?.getAttribute("aria-valuenow")).to.equal("25");
    expect(el.shadowRoot?.textContent).to.include("25%");
    await expect(el).to.be.accessible();
  });
});
