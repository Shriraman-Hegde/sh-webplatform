import { expect, fixture, html } from "@open-wc/testing";
import { css } from "lit";
import { WkElement } from "../../src/base/index.js";
import { defineElement } from "../../src/registry/index.js";
import { setIconLibrary } from "../../src/context/index.js";

class WkProbe extends WkElement {
  static styles = [
    WkElement.styles,
    css`
      :host {
        display: block;
      }
    `,
  ];

  render() {
    return html`<span>${this.icons.get("check") ?? "none"}</span>`;
  }
}

defineElement("wk-probe", WkProbe);

describe("WkElement", () => {
  it("inherits base host styles and resolves boot icon library", async () => {
    setIconLibrary({
      get: (name) => (name === "check" ? "ok" : undefined),
    });
    const el = await fixture<WkProbe>(html`<wk-probe></wk-probe>`);
    expect(el).to.be.instanceOf(WkElement);
    expect(el.shadowRoot?.textContent?.trim()).to.equal("ok");
  });
});
