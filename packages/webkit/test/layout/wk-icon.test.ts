import { expect, fixture, html } from "@open-wc/testing";
import { iconRegistry } from "@sh-webplatform/icons";
import { bootstrapWebkit } from "../../src/bootstrap.js";
import "../../src/components/layout/wk-icon/index.js";
import type { WkIcon } from "../../src/components/layout/wk-icon/index.js";

describe("wk-icon", () => {
  it("renders SVG from @sh-webplatform/icons registry", async () => {
    bootstrapWebkit({ icons: iconRegistry });
    const el = await fixture<WkIcon>(
      html`<wk-icon name="check" label="Done"></wk-icon>`,
    );
    expect(el.shadowRoot?.querySelector("svg")).to.exist;
  });
});
