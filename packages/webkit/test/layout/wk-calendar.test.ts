import { expect, fixture, html } from "@open-wc/testing";
import "../../src/components/layout/wk-calendar/index.js";
import type { WkCalendar } from "../../src/components/layout/wk-calendar/index.js";

describe("wk-calendar", () => {
  it("selects a day in the visible month", async () => {
    const el = await fixture<WkCalendar>(html`<wk-calendar year="2026" month="10"></wk-calendar>`);
    const day = [...(el.shadowRoot?.querySelectorAll("[role=gridcell]") ?? [])].find(
      (cell) => cell.textContent?.trim() === "28",
    ) as HTMLButtonElement;
    day.click();
    await el.updateComplete;
    expect(el.value).to.equal("2026-11-28");
  });

  it("jumps from the month and year lists", async () => {
    const el = await fixture<WkCalendar>(html`<wk-calendar year="2026" month="10"></wk-calendar>`);
    (el.shadowRoot?.querySelector("[aria-label='Choose month']") as HTMLButtonElement).click();
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector("[role=grid]")).to.equal(null);
    (el.shadowRoot?.querySelector("[data-month='5']") as HTMLButtonElement).click();
    await el.updateComplete;
    expect(el.month).to.equal(5);
    expect(el.shadowRoot?.querySelector("[role=grid]")).to.not.equal(null);

    (el.shadowRoot?.querySelector("[aria-label='Choose year']") as HTMLButtonElement).click();
    await el.updateComplete;
    (el.shadowRoot?.querySelector("[data-year='2020']") as HTMLButtonElement).click();
    await el.updateComplete;
    expect(el.year).to.equal(2020);
    expect(el.month).to.equal(5);
    expect(el.shadowRoot?.querySelector("[role=grid]")).to.not.equal(null);
  });

  it("skips a year from the double chevron", async () => {
    const el = await fixture<WkCalendar>(html`<wk-calendar year="2026" month="10"></wk-calendar>`);
    (el.shadowRoot?.querySelector("[aria-label='Next year']") as HTMLButtonElement).click();
    await el.updateComplete;
    expect(el.year).to.equal(2027);
    expect(el.month).to.equal(10);
    (el.shadowRoot?.querySelector("[aria-label='Previous year']") as HTMLButtonElement).click();
    await el.updateComplete;
    expect(el.year).to.equal(2026);
  });
});
