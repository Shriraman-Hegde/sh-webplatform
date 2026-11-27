import { expect, fixture, html } from "@open-wc/testing";
import { iconRegistry } from "@sh-webplatform/icons";
import { bootstrapWebkit } from "../../src/bootstrap.js";
import "../../src/components/form/wk-rich-text/index.js";
import type { WkRichText } from "../../src/components/form/wk-rich-text/index.js";

describe("wk-rich-text", () => {
  it("renders toolbar and editable surface", async () => {
    bootstrapWebkit({ icons: iconRegistry });
    const el = await fixture<WkRichText>(
      html`<wk-rich-text label="Notes" .value=${"<p>Hi</p>"}></wk-rich-text>`,
    );
    expect(el.shadowRoot?.querySelector('[role="toolbar"]')).to.exist;
    const editor = el.shadowRoot?.querySelector(".editor") as HTMLDivElement;
    expect(editor).to.exist;
    expect(editor.getAttribute("contenteditable") || editor.isContentEditable)
      .to.be.ok;
  });
});
