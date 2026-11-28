import { expect, fixture, html } from "@open-wc/testing";
import "../../src/components/layout/wk-side-nav/index.js";
import type { WkSideNav } from "../../src/components/layout/wk-side-nav/index.js";

describe("wk-side-nav", () => {
  it("sets the active item", async () => {
    const el = await fixture<WkSideNav>(html`
      <wk-side-nav
        .items=${[
          { id: "home", label: "Home" },
          { id: "team", label: "Team" },
        ]}
        active="home"
      ></wk-side-nav>
    `);
    const buttons = [...(el.shadowRoot?.querySelectorAll("button") ?? [])] as HTMLButtonElement[];
    buttons[1].click();
    await el.updateComplete;
    expect(el.active).to.equal("team");
    expect(buttons[1].getAttribute("aria-current")).to.equal("page");
  });
});
