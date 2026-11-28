import { expect, fixture, html } from "@open-wc/testing";
import "../../src/components/form/wk-search-field/index.js";
import type { WkSearchField } from "../../src/components/form/wk-search-field/index.js";

describe("wk-search-field", () => {
  it("emits wk-search on submit", async () => {
    const el = await fixture<WkSearchField>(html`<wk-search-field value="ada"></wk-search-field>`);
    let query = "";
    el.addEventListener("wk-search", ((event: CustomEvent<{ value: string }>) => {
      query = event.detail.value;
    }) as EventListener);
    el.shadowRoot?.querySelector("form")?.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    expect(query).to.equal("ada");
  });

  it("emits wk-input while typing", async () => {
    const el = await fixture<WkSearchField>(html`<wk-search-field></wk-search-field>`);
    let query = "";
    el.addEventListener("wk-input", ((event: CustomEvent<{ value: string }>) => {
      query = event.detail.value;
    }) as EventListener);
    const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;
    input.value = "ada";
    input.dispatchEvent(new Event("input", { bubbles: true }));
    expect(query).to.equal("ada");
  });
});
