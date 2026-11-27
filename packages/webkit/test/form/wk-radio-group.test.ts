import { expect, fixture, html } from "@open-wc/testing";
import "../../src/components/form/wk-radio-group/index.js";
import type { WkRadioGroup } from "../../src/components/form/wk-radio-group/index.js";

describe("wk-radio-group", () => {
  it("selects an option and emits wk-change", async () => {
    const el = await fixture<WkRadioGroup>(html`
      <wk-radio-group
        label="Priority"
        name="priority"
        value="low"
        .options=${[
          { value: "low", label: "Low" },
          { value: "high", label: "High" },
        ]}
      ></wk-radio-group>
    `);
    const high = el.shadowRoot?.querySelector(
      'input[value="high"]',
    ) as HTMLInputElement;
    let value = "";
    el.addEventListener("wk-change", ((e: CustomEvent<{ value: string }>) => {
      value = e.detail.value;
    }) as EventListener);
    high.click();
    await el.updateComplete;
    expect(el.value).to.equal("high");
    expect(value).to.equal("high");
  });
});
