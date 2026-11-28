import { expect, fixture, html } from "@open-wc/testing";
import "../../src/components/layout/wk-menubar/index.js";
import type { WkMenubar } from "../../src/components/layout/wk-menubar/index.js";

describe("wk-menubar", () => {
  it("opens a menu and emits the chosen item", async () => {
    const el = await fixture<WkMenubar>(html`
      <wk-menubar
        .menus=${[{ id: "file", label: "File", items: [{ value: "new", label: "New" }] }]}
      ></wk-menubar>
    `);
    const [menu, item] = [...(el.shadowRoot?.querySelectorAll("button") ?? [])] as HTMLButtonElement[];
    menu.click();
    await el.updateComplete;
    expect(el.open).to.equal("file");
    let value = "";
    el.addEventListener("wk-select", ((event: CustomEvent<{ value: string }>) => {
      value = event.detail.value;
    }) as EventListener);
    item.click();
    expect(value).to.equal("new");
  });
});
