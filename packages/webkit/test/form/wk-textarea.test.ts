import { expect, fixture, html } from "@open-wc/testing";
import "../../src/components/form/wk-textarea/index.js";
import type { WkTextarea } from "../../src/components/form/wk-textarea/index.js";

describe("wk-textarea", () => {
  it("renders a labeled textarea", async () => {
    const el = await fixture<WkTextarea>(
      html`<wk-textarea label="Notes" .value=${"Hello"}></wk-textarea>`,
    );
    const textarea = el.shadowRoot?.querySelector("textarea");
    expect(textarea).to.exist;
    expect(textarea?.value).to.equal("Hello");
    await expect(el).to.be.accessible();
  });
});
