import { expect, fixture, html } from "@open-wc/testing";
import "../../src/components/layout/wk-data-grid/index.js";
import type { WkDataGrid } from "../../src/components/layout/wk-data-grid/index.js";

const columns = [
  { key: "name", label: "Name", sortable: true, filterable: true },
  { key: "team", label: "Team", sortable: true, filterable: true },
  { key: "status", label: "Status", sortable: true },
];
const rows = [
  { name: "Ada", team: "Platform", status: "Open" },
  { name: "Grace", team: "Design", status: "Closed" },
];

describe("wk-data-grid", () => {
  async function grid() {
    return fixture<WkDataGrid>(html`
      <wk-data-grid caption="Records" .columns=${columns} .rows=${rows}></wk-data-grid>
    `);
  }

  it("sorts a column on the second click", async () => {
    const el = await grid();
    let direction = "";
    el.addEventListener("wk-sort", ((event: CustomEvent<{ direction: string }>) => {
      direction = event.detail.direction;
    }) as EventListener);
    const name = [...(el.shadowRoot?.querySelectorAll("thead button") ?? [])].find(
      (button) => button.textContent?.trim() === "Name",
    ) as HTMLButtonElement;
    name.click();
    await el.updateComplete;
    name.click();
    await el.updateComplete;
    expect(direction).to.equal("desc");
    const first = el.shadowRoot?.querySelector("tbody td");
    expect(first?.textContent).to.equal("Grace");
  });

  it("filters rows from the header field", async () => {
    const el = await grid();
    let filtered = { key: "", value: "" };
    el.addEventListener("wk-filter", ((event: CustomEvent<{ key: string; value: string }>) => {
      filtered = event.detail;
    }) as EventListener);
    const filter = el.shadowRoot?.querySelector("[aria-label='Filter Team']") as HTMLInputElement;
    filter.value = "design";
    filter.dispatchEvent(new Event("input", { bubbles: true }));
    await el.updateComplete;
    const cells = [...(el.shadowRoot?.querySelectorAll("tbody td") ?? [])].map((cell) => cell.textContent);
    expect(cells).to.deep.equal(["Grace", "Design", "Closed"]);
    expect(filtered.key).to.equal("team");
    expect(filtered.value).to.equal("design");
  });

  it("hides a column from the manager", async () => {
    const el = await grid();
    const status = [...(el.shadowRoot?.querySelectorAll(".manager-row") ?? [])].find((row) =>
      row.textContent?.includes("Status"),
    );
    (status?.querySelector("input") as HTMLInputElement).click();
    await el.updateComplete;
    const headers = [...(el.shadowRoot?.querySelectorAll("thead tr:first-child th") ?? [])].map((cell) =>
      cell.textContent?.trim(),
    );
    expect(headers).to.deep.equal(["Name", "Team"]);
  });
});
