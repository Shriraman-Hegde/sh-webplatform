import { expect, fixture, html } from "@open-wc/testing";
import "../../src/components/form/wk-select/index.js";
import type { WkSelect } from "../../src/components/form/wk-select/index.js";

function keydown(target: HTMLElement, key: string) {
  target.dispatchEvent(
    new KeyboardEvent("keydown", { key, bubbles: true, cancelable: true }),
  );
}

const options = [
  { value: "alpha", label: "Team Alpha", icon: "user" },
  { value: "beta", label: "Team Beta", icon: "home" },
];

describe("wk-select", () => {
  it("shows an icon on each option and on the selected value", async () => {
    const el = await fixture<WkSelect>(html`
      <wk-select label="Team" value="alpha" .options=${options}></wk-select>
    `);
    const triggerIcon = el.shadowRoot?.querySelector(".value-icon wk-icon");
    expect(triggerIcon?.getAttribute("name")).to.equal("user");

    (el.shadowRoot?.querySelector("button") as HTMLButtonElement).click();
    await el.updateComplete;
    const optionIcons = [
      ...el.shadowRoot!.querySelectorAll(".option wk-icon"),
    ].map((icon) => icon.getAttribute("name"));
    expect(optionIcons).to.deep.equal(["user", "home"]);
  });

  it("opens toward the requested side when not hoisted", async () => {
    const el = await fixture<WkSelect>(html`
      <wk-select
        label="Team"
        placement="top"
        value="beta"
        .options=${options}
      ></wk-select>
    `);
    expect(el.getAttribute("placement")).to.equal("top");
    (el.shadowRoot?.querySelector("button") as HTMLButtonElement).click();
    await el.updateComplete;
    const menu = el.shadowRoot?.querySelector(".menu") as HTMLElement;
    expect(menu.hidden).to.equal(false);
    expect(getComputedStyle(menu).bottom).to.not.equal("auto");
  });

  it("hoists the menu into the top layer", async () => {
    const el = await fixture<WkSelect>(html`
      <wk-select hoist label="Team" value="alpha" .options=${options}></wk-select>
    `);
    (el.shadowRoot?.querySelector("button") as HTMLButtonElement).click();
    await el.updateComplete;
    const menu = el.shadowRoot?.querySelector(".menu") as HTMLElement;
    expect(menu.hasAttribute("popover")).to.equal(true);
    expect(menu.matches(":popover-open")).to.equal(true);
    expect(getComputedStyle(menu).position).to.equal("fixed");
  });

  it("emits wk-change when a different option is chosen", async () => {
    const el = await fixture<WkSelect>(html`
      <wk-select label="Team" value="alpha" .options=${options}></wk-select>
    `);
    let next = "";
    el.addEventListener("wk-change", ((event: CustomEvent<{ value: string }>) => {
      next = event.detail.value;
    }) as EventListener);
    (el.shadowRoot?.querySelector("button") as HTMLButtonElement).click();
    await el.updateComplete;
    const beta = el.shadowRoot?.querySelectorAll(".option")[1] as HTMLElement;
    beta.click();
    await el.updateComplete;
    expect(el.value).to.equal("beta");
    expect(next).to.equal("beta");
    expect(el.open).to.equal(false);
  });

  it("moves the active option with the arrow keys", async () => {
    const el = await fixture<WkSelect>(html`
      <wk-select label="Team" value="alpha" .options=${options}></wk-select>
    `);
    const button = el.shadowRoot?.querySelector("button") as HTMLButtonElement;
    keydown(button, "ArrowDown");
    await el.updateComplete;
    expect(el.open).to.equal(true);
    keydown(button, "ArrowDown");
    await el.updateComplete;
    expect(el.activeIndex).to.equal(1);
    keydown(button, "Enter");
    await el.updateComplete;
    expect(el.value).to.equal("beta");
  });

  it("is accessible", async () => {
    const el = await fixture<WkSelect>(
      html`<wk-select label="Team" value="alpha" .options=${options}></wk-select>`,
    );
    await expect(el).to.be.accessible();
  });
});
