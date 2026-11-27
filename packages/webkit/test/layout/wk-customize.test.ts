import { expect, fixture, html } from "@open-wc/testing";
import "../../src/components/form/wk-button/index.js";
import "../../src/components/form/wk-text-field/index.js";
import "../../src/components/layout/wk-card/index.js";
import "../../src/components/layout/wk-chip/index.js";
import "../../src/components/layout/wk-dialog/index.js";
import "../../src/components/layout/wk-popover/index.js";
import "../../src/components/layout/wk-toolbar/index.js";
import type { WkButton } from "../../src/components/form/wk-button/index.js";
import type { WkTextField } from "../../src/components/form/wk-text-field/index.js";
import type { WkCard } from "../../src/components/layout/wk-card/index.js";
import type { WkChip } from "../../src/components/layout/wk-chip/index.js";
import type { WkDialog } from "../../src/components/layout/wk-dialog/index.js";
import type { WkPopover } from "../../src/components/layout/wk-popover/index.js";
import type { WkToolbar } from "../../src/components/layout/wk-toolbar/index.js";

function once(target: EventTarget, type: string): Promise<CustomEvent> {
  return new Promise((resolve) => {
    target.addEventListener(type, (event) => resolve(event as CustomEvent), { once: true });
  });
}

describe("customization and new controls", () => {
  it("keeps page CSS out of the shadow tree and lets tokens and parts through", async () => {
    const root = await fixture<HTMLDivElement>(html`
      <div>
        <style>
          wk-button button {
            background: rgb(180, 35, 24);
          }
          wk-button.shaped::part(control) {
            border-radius: 999px;
          }
        </style>
        <wk-button id="plain" style="--wk-accent: rgb(11, 110, 153)">Save</wk-button>
        <wk-button class="shaped" id="shaped">Save</wk-button>
      </div>
    `);
    const plain = root.querySelector<WkButton>("#plain")!;
    const shaped = root.querySelector<WkButton>("#shaped")!;
    const plainButton = plain.shadowRoot?.querySelector("button");
    const shapedButton = shaped.shadowRoot?.querySelector("button");
    const plainFill = getComputedStyle(plainButton!).backgroundColor;
    expect(plainFill).to.equal("rgb(11, 110, 153)");
    expect(plainFill).to.not.equal("rgb(180, 35, 24)");
    expect(getComputedStyle(shapedButton!).borderRadius).to.equal("999px");
    expect(plainButton?.getAttribute("part")).to.equal("control");
  });

  it("shows a spinner and disables the button while loading", async () => {
    const el = await fixture<WkButton>(html`<wk-button loading>Saving</wk-button>`);
    const button = el.shadowRoot?.querySelector("button");
    expect(button?.disabled).to.equal(true);
    expect(el.getAttribute("aria-busy")).to.equal("true");
    expect(el.shadowRoot?.querySelector(".ring")).to.exist;
  });

  it("shows hint and error text on a field", async () => {
    const el = await fixture<WkTextField>(html`
      <wk-text-field
        label="Title"
        hint="Shown on the record"
        message="Use at least 3 characters."
        error
      ></wk-text-field>
    `);
    expect(el.shadowRoot?.querySelector(".hint")?.textContent).to.equal("Shown on the record");
    expect(el.shadowRoot?.querySelector(".message")?.textContent).to.equal(
      "Use at least 3 characters.",
    );
    expect(el.shadowRoot?.querySelector("input")?.getAttribute("aria-invalid")).to.equal("true");
  });

  it("projects card actions and exposes the surface part", async () => {
    const el = await fixture<WkCard>(html`
      <wk-card heading="Request">
        Ready
        <button slot="actions" type="button">File</button>
      </wk-card>
    `);
    await el.updateComplete;
    const actions = el.shadowRoot?.querySelector(".actions");
    expect(actions?.hasAttribute("hidden")).to.equal(false);
    expect(el.shadowRoot?.querySelector("[part=surface]")).to.exist;
    expect(el.querySelector("button")?.textContent).to.equal("File");
  });

  it("exposes a dialog panel part", async () => {
    const el = await fixture<WkDialog>(html`<wk-dialog heading="Confirm"></wk-dialog>`);
    expect(el.shadowRoot?.querySelector("dialog")?.getAttribute("part")).to.equal("panel");
  });

  it("emits wk-remove from a chip", async () => {
    const el = await fixture<WkChip>(html`<wk-chip removable>Draft</wk-chip>`);
    const heard = once(el, "wk-remove");
    el.shadowRoot?.querySelector("button")?.click();
    expect((await heard).type).to.equal("wk-remove");
    await expect(el).to.be.accessible();
  });

  it("opens a popover under its trigger", async () => {
    const el = await fixture<WkPopover>(html`<wk-popover open label="Details"><p>Note</p></wk-popover>`);
    await el.updateComplete;
    await new Promise((resolve) => requestAnimationFrame(resolve));
    const panel = el.shadowRoot?.querySelector(".panel");
    expect(panel?.matches(":popover-open")).to.equal(true);
    expect(panel?.getAttribute("part")).to.equal("panel");
  });

  it("names a toolbar and moves focus with the arrow keys", async () => {
    const el = await fixture<WkToolbar>(html`
      <wk-toolbar label="Record actions">
        <wk-button id="save">Save</wk-button>
        <wk-button id="cancel" variant="secondary">Cancel</wk-button>
      </wk-toolbar>
    `);
    const bar = el.shadowRoot?.querySelector("[role=toolbar]");
    expect(bar?.getAttribute("aria-label")).to.equal("Record actions");
    const save = el.querySelector<WkButton>("#save")!;
    const cancel = el.querySelector<WkButton>("#cancel")!;
    save.focus();
    save.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true, composed: true }));
    expect(el.shadowRoot?.querySelector("[part=bar]")).to.exist;
    expect(document.activeElement === cancel || cancel.shadowRoot?.activeElement).to.be.ok;
    await expect(el).to.be.accessible();
  });
});
