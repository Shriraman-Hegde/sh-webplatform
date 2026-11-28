import { expect, fixture, html } from "@open-wc/testing";
import "../../src/components/layout/wk-code/index.js";

describe("wk-code", () => {
  it("renders a block when requested", async () => {
    const el = await fixture(html`<wk-code block>const ready = true;</wk-code>`);
    expect(el.shadowRoot?.querySelector("pre")).to.exist;
  });
});
