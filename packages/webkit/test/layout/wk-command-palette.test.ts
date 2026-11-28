import { expect, fixture, html } from "@open-wc/testing";
import "../../src/components/layout/wk-command-palette/index.js";
import type { WkCommandPalette } from "../../src/components/layout/wk-command-palette/index.js";

describe("wk-command-palette", () => {
  it("filters commands and emits the selection", async () => {
    const el = await fixture<WkCommandPalette>(html`
      <wk-command-palette
        open
        .commands=${[
          { value: "new", label: "New record" },
          { value: "search", label: "Search" },
        ]}
      ></wk-command-palette>
    `);
    const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;
    input.value = "sea";
    input.dispatchEvent(new Event("input", { bubbles: true }));
    await el.updateComplete;
    const buttons = [...(el.shadowRoot?.querySelectorAll("button") ?? [])] as HTMLButtonElement[];
    expect(buttons.map((button) => button.textContent?.trim())).to.deep.equal(["Search"]);
    let value = "";
    el.addEventListener("wk-select", ((event: CustomEvent<{ value: string }>) => {
      value = event.detail.value;
    }) as EventListener);
    buttons[0].click();
    expect(value).to.equal("search");
    expect(el.open).to.equal(false);
  });
});
