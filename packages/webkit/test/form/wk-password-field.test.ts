import { expect, fixture, html } from "@open-wc/testing";
import "../../src/components/form/wk-password-field/index.js";
import type { WkPasswordField } from "../../src/components/form/wk-password-field/index.js";

describe("wk-password-field", () => {
  it("reveals the password", async () => {
    const el = await fixture<WkPasswordField>(html`
      <wk-password-field label="Password" value="secret"></wk-password-field>
    `);
    const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;
    expect(input.type).to.equal("password");
    (el.shadowRoot?.querySelector("[part=reveal]") as HTMLButtonElement).click();
    await el.updateComplete;
    expect(el.revealed).to.equal(true);
    expect(input.type).to.equal("text");
  });
});
