import { expect, fixture, html } from "@open-wc/testing";
import "../../src/components/form/wk-time-field/index.js";
import type { WkTimeField } from "../../src/components/form/wk-time-field/index.js";

describe("wk-time-field", () => {
  it("emits the chosen time", async () => {
    const el = await fixture<WkTimeField>(html`<wk-time-field label="Start"></wk-time-field>`);
    const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;
    input.value = "09:30";
    input.dispatchEvent(new Event("change", { bubbles: true }));
    await el.updateComplete;
    expect(el.value).to.equal("09:30");
  });
});
