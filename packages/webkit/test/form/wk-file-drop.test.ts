import { expect, fixture, html } from "@open-wc/testing";
import "../../src/components/form/wk-file-drop/index.js";
import type { WkFileDrop } from "../../src/components/form/wk-file-drop/index.js";

describe("wk-file-drop", () => {
  it("records the chosen file name", async () => {
    const el = await fixture<WkFileDrop>(html`<wk-file-drop label="Attach"></wk-file-drop>`);
    const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;
    const transfer = new DataTransfer();
    transfer.items.add(new File(["note"], "brief.txt", { type: "text/plain" }));
    input.files = transfer.files;
    input.dispatchEvent(new Event("change", { bubbles: true }));
    await el.updateComplete;
    expect(el.files.map((file) => file.name)).to.deep.equal(["brief.txt"]);
    expect(el.shadowRoot?.textContent).to.include("brief.txt");
  });

  it("ignores a file outside accept", async () => {
    const el = await fixture<WkFileDrop>(html`<wk-file-drop label="Attach" accept="image/*"></wk-file-drop>`);
    const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;
    const transfer = new DataTransfer();
    transfer.items.add(new File(["note"], "brief.txt", { type: "text/plain" }));
    transfer.items.add(new File(["img"], "photo.png", { type: "image/png" }));
    input.files = transfer.files;
    input.dispatchEvent(new Event("change", { bubbles: true }));
    await el.updateComplete;
    expect(el.files.map((file) => file.name)).to.deep.equal(["photo.png"]);
  });
});
