import { expect, fixture, html } from "@open-wc/testing";
import "../../src/components/layout/wk-dialog/index.js";
import type { WkDialog } from "../../src/components/layout/wk-dialog/index.js";

describe("wk-dialog", () => {
  it("opens and closes the native dialog", async () => {
    const el = await fixture<WkDialog>(
      html`<wk-dialog heading="Confirm"><p>Body</p></wk-dialog>`,
    );
    const dialog = el.shadowRoot?.querySelector("dialog");
    expect(dialog).to.exist;
    expect(dialog?.open).to.equal(false);

    el.open = true;
    await el.updateComplete;
    expect(dialog?.open).to.equal(true);

    el.shadowRoot?.querySelector<HTMLButtonElement>("button.close")?.click();
    await el.updateComplete;
    expect(el.open).to.equal(false);
  });
});
