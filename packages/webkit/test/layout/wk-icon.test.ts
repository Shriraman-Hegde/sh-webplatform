import { expect, fixture, html } from "@open-wc/testing";
import { bootstrapWebkit } from "../../src/bootstrap.js";
import "../../src/components/layout/wk-icon/index.js";
import type { WkIcon } from "../../src/components/layout/wk-icon/index.js";

describe("wk-icon", () => {
  it("renders a glyph from the icon library", async () => {
    bootstrapWebkit({
      icons: { get: (name) => (name === "check" ? "✓" : undefined) },
    });
    const el = await fixture<WkIcon>(
      html`<wk-icon name="check" label="Done"></wk-icon>`,
    );
    expect(el.shadowRoot?.textContent?.trim()).to.equal("✓");
  });
});
