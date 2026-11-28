import { expect, fixture, html } from "@open-wc/testing";
import "../../src/components/layout/wk-context-menu/index.js";
import type { WkContextMenu } from "../../src/components/layout/wk-context-menu/index.js";

describe("wk-context-menu", () => {
  it("opens from a context menu event and emits the item", async () => {
    const el = await fixture<WkContextMenu>(html`
      <wk-context-menu .items=${[{ value: "copy", label: "Copy" }]}><span>Row</span></wk-context-menu>
    `);
    const target = el.shadowRoot?.querySelector(".target") as HTMLElement;
    target.dispatchEvent(new MouseEvent("contextmenu", { bubbles: true, cancelable: true, clientX: 12, clientY: 20 }));
    await el.updateComplete;
    expect(el.open).to.equal(true);
    let value = "";
    el.addEventListener("wk-select", ((event: CustomEvent<{ value: string }>) => {
      value = event.detail.value;
    }) as EventListener);
    (el.shadowRoot?.querySelector("[role=menuitem]") as HTMLButtonElement).click();
    expect(value).to.equal("copy");
  });
});
