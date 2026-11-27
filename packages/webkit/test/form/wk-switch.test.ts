import { expect, fixture, html } from "@open-wc/testing";
import "../../src/components/form/wk-switch/index.js";
import type { WkSwitch } from "../../src/components/form/wk-switch/index.js";

describe("wk-switch", () => {
  it("toggles and emits wk-change", async () => {
    const el = await fixture<WkSwitch>(
      html`<wk-switch label="Notify"></wk-switch>`,
    );
    const input = el.shadowRoot?.querySelector("input");
    expect(input?.getAttribute("role")).to.equal("switch");

    let checked = false;
    el.addEventListener("wk-change", ((e: CustomEvent<{ checked: boolean }>) => {
      checked = e.detail.checked;
    }) as EventListener);

    input?.click();
    await el.updateComplete;
    expect(el.checked).to.equal(true);
    expect(checked).to.equal(true);
  });
});
