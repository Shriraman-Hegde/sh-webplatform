import { expect, fixture, html } from "@open-wc/testing";
import "../../src/components/form/wk-color-field/index.js";
import type { WkColorField } from "../../src/components/form/wk-color-field/index.js";

describe("wk-color-field", () => {
  it("emits the picked color", async () => {
    const el = await fixture<WkColorField>(html`<wk-color-field label="Accent"></wk-color-field>`);
    const input = el.shadowRoot?.querySelector("[part=swatch]") as HTMLInputElement;
    input.value = "#112233";
    input.dispatchEvent(new Event("input", { bubbles: true }));
    await el.updateComplete;
    expect(el.value).to.equal("#112233");
  });
});
