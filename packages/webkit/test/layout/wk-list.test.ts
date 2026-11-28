import { expect, fixture, html } from "@open-wc/testing";
import "../../src/components/layout/wk-list/index.js";
import type { WkList } from "../../src/components/layout/wk-list/index.js";

describe("wk-list", () => {
  it("emits the selected row", async () => {
    const el = await fixture<WkList>(html`
      <wk-list .items=${[{ id: "ada", label: "Ada", detail: "Platform" }]}></wk-list>
    `);
    let id = "";
    el.addEventListener("wk-select", ((event: CustomEvent<{ id: string }>) => {
      id = event.detail.id;
    }) as EventListener);
    (el.shadowRoot?.querySelector("button") as HTMLButtonElement).click();
    expect(id).to.equal("ada");
  });
});
