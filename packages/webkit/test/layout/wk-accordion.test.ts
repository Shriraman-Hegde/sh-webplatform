import { expect, fixture, html } from "@open-wc/testing";
import "../../src/components/layout/wk-accordion/index.js";
import type { WkAccordion } from "../../src/components/layout/wk-accordion/index.js";

describe("wk-accordion", () => {
  it("toggles panels and emits wk-change", async () => {
    const el = await fixture<WkAccordion>(html`
      <wk-accordion
        .items=${[
          { id: "a", title: "A" },
          { id: "b", title: "B" },
        ]}
        .openIds=${["a"]}
      >
        <div slot="a">Panel A</div>
        <div slot="b">Panel B</div>
      </wk-accordion>
    `);
    let openIds: string[] = [];
    el.addEventListener("wk-change", ((e: CustomEvent<{ openIds: string[] }>) => {
      openIds = e.detail.openIds;
    }) as EventListener);

    const button = el.shadowRoot?.querySelector(
      "#header-b",
    ) as HTMLButtonElement;
    button.click();
    await el.updateComplete;
    expect(el.openIds).to.deep.equal(["b"]);
    expect(openIds).to.deep.equal(["b"]);
  });
});
