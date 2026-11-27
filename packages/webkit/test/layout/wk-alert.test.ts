import { expect, fixture, html } from "@open-wc/testing";
import "../../src/components/layout/wk-alert/index.js";
import type { WkAlert } from "../../src/components/layout/wk-alert/index.js";

describe("wk-alert", () => {
  it("renders heading and body with alert role", async () => {
    const el = await fixture<WkAlert>(
      html`<wk-alert tone="warning" heading="Caution">Check this</wk-alert>`,
    );
    const root = el.shadowRoot?.querySelector('[role="alert"]');
    expect(root).to.exist;
    expect(el.shadowRoot?.textContent).to.include("Caution");
    await expect(el).to.be.accessible();
  });
});
