import { expect, fixture, html } from "@open-wc/testing";
import "../../src/components/layout/wk-tooltip/index.js";
import type { WkTooltip } from "../../src/components/layout/wk-tooltip/index.js";

describe("wk-tooltip", () => {
  it("renders tooltip content", async () => {
    const el = await fixture<WkTooltip>(html`
      <wk-tooltip content="Hint text">
        <button type="button">Target</button>
      </wk-tooltip>
    `);
    const tip = el.shadowRoot?.querySelector('[role="tooltip"]');
    expect(tip?.textContent?.trim()).to.equal("Hint text");
  });
});
