import { expect, fixture, html } from "@open-wc/testing";
import { iconRegistry } from "@sh-webplatform/icons";
import { bootstrapWebkit } from "../../src/bootstrap.js";
import "../../src/components/form/wk-textarea/index.js";
import type { WkTextarea } from "../../src/components/form/wk-textarea/index.js";

describe("wk-textarea", () => {
  it("renders a labeled textarea by default", async () => {
    const el = await fixture<WkTextarea>(
      html`<wk-textarea label="Notes" .value=${"Hello"}></wk-textarea>`,
    );
    const textarea = el.shadowRoot?.querySelector("textarea");
    expect(textarea).to.exist;
    expect(textarea?.value).to.equal("Hello");
    expect(el.shadowRoot?.querySelector('[role="toolbar"]')).to.not.exist;
    await expect(el).to.be.accessible();
  });

  it("opts into rich text mode with toolbar", async () => {
    bootstrapWebkit({ icons: iconRegistry });
    const el = await fixture<WkTextarea>(
      html`<wk-textarea
        label="Notes"
        rich
        .value=${"<p>Hi</p>"}
      ></wk-textarea>`,
    );
    expect(el.shadowRoot?.querySelector("textarea")).to.not.exist;
    expect(el.shadowRoot?.querySelector('[role="toolbar"]')).to.exist;
    expect(el.shadowRoot?.querySelector(".editor")).to.exist;
  });
});
