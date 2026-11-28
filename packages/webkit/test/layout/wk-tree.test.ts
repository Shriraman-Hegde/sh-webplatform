import { expect, fixture, html } from "@open-wc/testing";
import "../../src/components/layout/wk-tree/index.js";
import type { WkTree } from "../../src/components/layout/wk-tree/index.js";

describe("wk-tree", () => {
  it("expands a branch", async () => {
    const el = await fixture<WkTree>(html`
      <wk-tree
        .nodes=${[{ id: "files", label: "Files", children: [{ id: "brief", label: "Brief" }] }]}
      ></wk-tree>
    `);
    (el.shadowRoot?.querySelector("button") as HTMLButtonElement).click();
    await el.updateComplete;
    expect(el.expanded).to.deep.equal(["files"]);
    expect(el.shadowRoot?.textContent).to.include("Brief");
    const leaf = [...(el.shadowRoot?.querySelectorAll("[role=treeitem]") ?? [])].find(
      (item) => !item.querySelector("[role=treeitem]"),
    );
    expect(leaf?.hasAttribute("aria-expanded")).to.equal(false);
  });
});
