import { expect, fixture, html } from "@open-wc/testing";
import "../../src/components/layout/wk-tabs/index.js";
import type { WkTabs } from "../../src/components/layout/wk-tabs/index.js";

describe("wk-tabs", () => {
  it("switches active tab and emits wk-change", async () => {
    const el = await fixture<WkTabs>(html`
      <wk-tabs
        .tabs=${[
          { id: "a", label: "A" },
          { id: "b", label: "B" },
        ]}
        active="a"
      >
        <div slot="a">Panel A</div>
        <div slot="b">Panel B</div>
      </wk-tabs>
    `);
    let id = "";
    el.addEventListener("wk-change", ((e: CustomEvent<{ id: string }>) => {
      id = e.detail.id;
    }) as EventListener);

    const button = el.shadowRoot?.querySelector(
      'button[aria-controls="panel-b"]',
    ) as HTMLButtonElement;
    button.click();
    await el.updateComplete;
    expect(el.active).to.equal("b");
    expect(id).to.equal("b");
  });
});
