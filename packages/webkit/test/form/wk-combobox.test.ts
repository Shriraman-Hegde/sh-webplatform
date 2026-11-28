import { expect, fixture, html } from "@open-wc/testing";
import "../../src/components/form/wk-combobox/index.js";
import type { WkCombobox } from "../../src/components/form/wk-combobox/index.js";

describe("wk-combobox", () => {
  it("filters options and emits the chosen value", async () => {
    const el = await fixture<WkCombobox>(html`
      <wk-combobox
        label="Team"
        .options=${[
          { value: "platform", label: "Platform" },
          { value: "design", label: "Design" },
        ]}
      ></wk-combobox>
    `);
    const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;
    input.value = "des";
    input.dispatchEvent(new Event("input", { bubbles: true }));
    await el.updateComplete;
    const options = [...(el.shadowRoot?.querySelectorAll("[role=option]") ?? [])];
    expect(options.map((option) => option.textContent?.trim())).to.deep.equal(["Design"]);

    let value = "";
    el.addEventListener("wk-change", ((event: CustomEvent<{ value: string }>) => {
      value = event.detail.value;
    }) as EventListener);
    (options[0].querySelector("button") as HTMLButtonElement).click();
    await el.updateComplete;
    expect(value).to.equal("design");
    expect(el.open).to.equal(false);
  });

  it("chooses the active option with the keyboard", async () => {
    const el = await fixture<WkCombobox>(html`
      <wk-combobox
        label="Team"
        .options=${[
          { value: "platform", label: "Platform" },
          { value: "design", label: "Design" },
        ]}
      ></wk-combobox>
    `);
    const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;
    input.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true }));
    await el.updateComplete;
    input.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true }));
    await el.updateComplete;
    input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true, cancelable: true }));
    await el.updateComplete;
    expect(el.value).to.equal("design");
    expect(el.query).to.equal("Design");
  });
});
