import { expect, fixture, html } from "@open-wc/testing";
import "../../src/components/form/wk-slider/index.js";
import type { WkSlider } from "../../src/components/form/wk-slider/index.js";

describe("wk-slider", () => {
  it("emits wk-input when the range changes", async () => {
    const el = await fixture<WkSlider>(html`<wk-slider label="Volume" value="20"></wk-slider>`);
    let value = 0;
    el.addEventListener("wk-input", ((event: CustomEvent<{ value: number }>) => {
      value = event.detail.value;
    }) as EventListener);
    const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;
    input.value = "40";
    input.dispatchEvent(new Event("input", { bubbles: true }));
    await el.updateComplete;
    expect(el.value).to.equal(40);
    expect(value).to.equal(40);
  });
});
