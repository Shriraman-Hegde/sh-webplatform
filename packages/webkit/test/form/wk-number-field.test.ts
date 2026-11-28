import { expect, fixture, html } from "@open-wc/testing";
import "../../src/components/form/wk-number-field/index.js";
import type { WkNumberField } from "../../src/components/form/wk-number-field/index.js";

describe("wk-number-field", () => {
  it("steps the value and clamps to max", async () => {
    const el = await fixture<WkNumberField>(html`
      <wk-number-field label="Quantity" value="2" min="0" max="3"></wk-number-field>
    `);
    const increase = el.shadowRoot?.querySelector("[part=increment]") as HTMLButtonElement;
    increase.click();
    await el.updateComplete;
    expect(el.value).to.equal(3);
    increase.click();
    await el.updateComplete;
    expect(el.value).to.equal(3);
  });

  it("snaps a typed value to the step", async () => {
    const el = await fixture<WkNumberField>(html`
      <wk-number-field label="Quantity" value="0" step="5"></wk-number-field>
    `);
    const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;
    input.value = "7";
    input.dispatchEvent(new Event("change", { bubbles: true }));
    await el.updateComplete;
    expect(el.value).to.equal(5);
  });
});
