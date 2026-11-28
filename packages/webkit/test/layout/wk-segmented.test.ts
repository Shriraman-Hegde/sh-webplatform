import { expect, fixture, html } from "@open-wc/testing";
import "../../src/components/layout/wk-segmented/index.js";
import type { WkSegmented } from "../../src/components/layout/wk-segmented/index.js";

describe("wk-segmented", () => {
  it("selects one option", async () => {
    const el = await fixture<WkSegmented>(html`
      <wk-segmented
        label="View"
        value="list"
        .options=${[
          { value: "list", label: "List" },
          { value: "board", label: "Board" },
        ]}
      ></wk-segmented>
    `);
    const board = [...(el.shadowRoot?.querySelectorAll("button") ?? [])][1] as HTMLButtonElement;
    board.click();
    await el.updateComplete;
    expect(el.value).to.equal("board");
    expect(board.getAttribute("aria-checked")).to.equal("true");
  });
});
