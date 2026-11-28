import { expect, fixture, html } from "@open-wc/testing";
import "../../src/components/form/wk-tag-field/index.js";
import type { WkTagField } from "../../src/components/form/wk-tag-field/index.js";

describe("wk-tag-field", () => {
  it("adds a tag on Enter and removes it from the chip", async () => {
    const el = await fixture<WkTagField>(html`<wk-tag-field label="Labels"></wk-tag-field>`);
    const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;
    input.value = "Draft";
    input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true, cancelable: true }));
    await el.updateComplete;
    expect(el.tags).to.deep.equal(["Draft"]);
    (el.shadowRoot?.querySelector("button") as HTMLButtonElement).click();
    await el.updateComplete;
    expect(el.tags).to.deep.equal([]);
  });
});
