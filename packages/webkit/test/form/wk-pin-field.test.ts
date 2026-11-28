import { expect, fixture, html } from "@open-wc/testing";
import "../../src/components/form/wk-pin-field/index.js";
import type { WkPinField } from "../../src/components/form/wk-pin-field/index.js";

describe("wk-pin-field", () => {
  it("emits wk-change when every box is filled", async () => {
    const el = await fixture<WkPinField>(html`<wk-pin-field label="Code" length="2"></wk-pin-field>`);
    let value = "";
    el.addEventListener("wk-change", ((event: CustomEvent<{ value: string }>) => {
      value = event.detail.value;
    }) as EventListener);
    const boxes = [...(el.shadowRoot?.querySelectorAll("input") ?? [])] as HTMLInputElement[];
    boxes[0].value = "4";
    boxes[0].dispatchEvent(new Event("input", { bubbles: true }));
    await el.updateComplete;
    boxes[1].value = "2";
    boxes[1].dispatchEvent(new Event("input", { bubbles: true }));
    await el.updateComplete;
    expect(el.value).to.equal("42");
    expect(value).to.equal("42");
  });
});
