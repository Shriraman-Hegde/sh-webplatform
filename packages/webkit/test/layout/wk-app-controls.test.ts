import { expect, fixture, html } from "@open-wc/testing";

function once(target: EventTarget, type: string): Promise<CustomEvent> {
  return new Promise((resolve) => {
    target.addEventListener(type, (event) => resolve(event as CustomEvent), {
      once: true,
    });
  });
}
import "../../src/components/layout/wk-pagination/index.js";
import "../../src/components/layout/wk-drawer/index.js";
import "../../src/components/layout/wk-menu/index.js";
import "../../src/components/layout/wk-toast/index.js";
import "../../src/components/layout/wk-avatar/index.js";
import "../../src/components/layout/wk-empty/index.js";
import type { WkPagination } from "../../src/components/layout/wk-pagination/index.js";
import type { WkDrawer } from "../../src/components/layout/wk-drawer/index.js";
import type { WkMenu } from "../../src/components/layout/wk-menu/index.js";
import type { WkToast } from "../../src/components/layout/wk-toast/index.js";
import type { WkAvatar } from "../../src/components/layout/wk-avatar/index.js";
import type { WkEmpty } from "../../src/components/layout/wk-empty/index.js";

describe("app controls", () => {
  it("moves pagination and announces the current page", async () => {
    const el = await fixture<WkPagination>(
      html`<wk-pagination page="2" pages="4"></wk-pagination>`,
    );
    const current = el.shadowRoot?.querySelector("[aria-current='page']");
    expect(current?.textContent?.trim()).to.equal("2");
    const next = el.shadowRoot?.querySelectorAll("button");
    const nextButton = [...(next ?? [])].find((button) =>
      button.textContent?.includes("Next"),
    );
    const heard = once(el, "wk-change");
    nextButton?.click();
    expect((await heard).detail).to.deep.equal({ page: 3 });
    await expect(el).to.be.accessible();
  });

  it("opens a drawer and closes it from the close button", async () => {
    const el = await fixture<WkDrawer>(
      html`<wk-drawer heading="Record" open>Body</wk-drawer>`,
    );
    await el.updateComplete;
    const dialog = el.shadowRoot?.querySelector("dialog");
    expect(dialog?.open).to.equal(true);
    const heard = once(el, "wk-close");
    el.shadowRoot?.querySelector("button")?.click();
    await heard;
    expect(el.open).to.equal(false);
  });

  it("emits the chosen menu value", async () => {
    const el = await fixture<WkMenu>(html`
      <wk-menu label="Actions" open>
        <button type="button" value="copy">Copy</button>
      </wk-menu>
    `);
    await el.updateComplete;
    const heard = once(el, "wk-select");
    el.querySelector("button")?.click();
    expect((await heard).detail).to.deep.equal({ value: "copy" });
  });

  it("dismisses a toast", async () => {
    const el = await fixture<WkToast>(
      html`<wk-toast open tone="success" duration="0">Saved</wk-toast>`,
    );
    const heard = once(el, "wk-close");
    el.shadowRoot?.querySelector("button")?.click();
    await heard;
    expect(el.open).to.equal(false);
    await expect(el).to.be.accessible();
  });

  it("builds avatar initials", async () => {
    const el = await fixture<WkAvatar>(
      html`<wk-avatar label="Ada Lovelace"></wk-avatar>`,
    );
    expect(el.shadowRoot?.textContent).to.include("AL");
    await expect(el).to.be.accessible();
  });

  it("renders an empty state heading", async () => {
    const el = await fixture<WkEmpty>(
      html`<wk-empty heading="No records" icon="search"></wk-empty>`,
    );
    expect(el.shadowRoot?.querySelector("h2")?.textContent).to.equal(
      "No records",
    );
    await expect(el).to.be.accessible();
  });
});
