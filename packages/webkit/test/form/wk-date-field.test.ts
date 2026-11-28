import { expect, fixture, html } from "@open-wc/testing";
import "../../src/components/form/wk-date-field/index.js";
import type { WkDateField } from "../../src/components/form/wk-date-field/index.js";

describe("wk-date-field", () => {
  it("emits the chosen date", async () => {
    const el = await fixture<WkDateField>(html`<wk-date-field label="Due"></wk-date-field>`);
    let value = "";
    el.addEventListener("wk-change", ((event: CustomEvent<{ value: string }>) => {
      value = event.detail.value;
    }) as EventListener);
    const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;
    input.value = "2026-11-28";
    input.dispatchEvent(new Event("change", { bubbles: true }));
    await el.updateComplete;
    expect(el.value).to.equal("2026-11-28");
    expect(value).to.equal("2026-11-28");
  });

  it("sets the value from the calendar popover", async () => {
    const el = await fixture<WkDateField>(html`<wk-date-field label="Due" value="2026-11-01"></wk-date-field>`);
    (el.shadowRoot?.querySelector("[part=picker]") as HTMLButtonElement).click();
    await el.updateComplete;
    const calendar = el.shadowRoot?.querySelector("wk-calendar");
    await calendar?.updateComplete;
    const day = [...(calendar?.shadowRoot?.querySelectorAll("[role=gridcell]") ?? [])].find(
      (cell) => cell.textContent?.trim() === "28",
    ) as HTMLButtonElement;
    day.click();
    await el.updateComplete;
    expect(el.value).to.equal("2026-11-28");
    expect(el.open).to.equal(false);
  });

  it("keeps the calendar inside the viewport", async () => {
    const wrap = await fixture<HTMLDivElement>(html`
      <div style="display:flex; justify-content:flex-end; width:100%">
        <wk-date-field label="Due" value="2026-11-01" style="width:16rem"></wk-date-field>
      </div>
    `);
    const el = wrap.querySelector("wk-date-field") as WkDateField;
    (el.shadowRoot?.querySelector("[part=picker]") as HTMLButtonElement).click();
    await el.updateComplete;
    await new Promise((resolve) => requestAnimationFrame(resolve));
    const panel = el.shadowRoot?.querySelector(".panel") as HTMLElement;
    const box = panel.getBoundingClientRect();
    expect(box.width).to.be.greaterThan(100);
    expect(box.left).to.be.at.least(0);
    expect(box.right).to.be.at.most(window.innerWidth + 1);
    const calendar = el.shadowRoot?.querySelector("wk-calendar");
    (calendar?.shadowRoot?.querySelector("[aria-label='Next month']") as HTMLButtonElement).click();
    await calendar?.updateComplete;
    expect(calendar?.month).to.equal(11);
    expect(el.open).to.equal(true);
  });

  it("places the calendar icon inside the field", async () => {
    const start = await fixture<WkDateField>(html`<wk-date-field icon-position="start"></wk-date-field>`);
    const end = await fixture<WkDateField>(html`<wk-date-field></wk-date-field>`);
    const picker = start.shadowRoot?.querySelector("[part=picker]") as HTMLElement;
    expect(start.iconPosition).to.equal("start");
    expect(start.shadowRoot?.querySelector(".field")?.contains(picker)).to.equal(true);
    expect(getComputedStyle(picker).position).to.equal("absolute");
    expect(getComputedStyle(picker).insetInlineStart).not.to.equal("auto");
    expect(end.iconPosition).to.equal("end");
  });
});
