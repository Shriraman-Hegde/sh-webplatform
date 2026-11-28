import { expect, fixture, html } from "@open-wc/testing";
import { iconRegistry } from "@sh-webplatform/icons";
import { bootstrapWebkit } from "../../src/bootstrap.js";
import { defaultIconLibrary } from "../../src/boot-icons.js";
import "../../src/components/layout/wk-icon/index.js";
import type { WkIcon } from "../../src/components/layout/wk-icon/index.js";

describe("wk-icon", () => {
  it("renders SVG from @sh-webplatform/icons registry", async () => {
    bootstrapWebkit({ icons: iconRegistry });
    const el = await fixture<WkIcon>(
      html`<wk-icon name="check" label="Done"></wk-icon>`,
    );
    expect(el.shadowRoot?.querySelector("svg")).to.exist;
  });

  it("renders a kit app glyph such as calendar", async () => {
    bootstrapWebkit({ icons: defaultIconLibrary });
    const el = await fixture<WkIcon>(
      html`<wk-icon name="calendar" label="Calendar"></wk-icon>`,
    );
    expect(el.shadowRoot?.querySelector("svg")).to.exist;
  });

  it("fills the glyph when fill is set", async () => {
    bootstrapWebkit({ icons: defaultIconLibrary });
    const el = await fixture<WkIcon>(
      html`<wk-icon name="calendar" fill="rgb(12, 80, 120)"></wk-icon>`,
    );
    const svg = el.shadowRoot?.querySelector("svg") as SVGElement;
    expect(getComputedStyle(svg).fill).to.equal("rgb(12, 80, 120)");
  });

  it("sets the glyph border when stroke is set", async () => {
    bootstrapWebkit({ icons: defaultIconLibrary });
    const el = await fixture<WkIcon>(
      html`<wk-icon name="calendar" stroke="rgb(180, 40, 40)"></wk-icon>`,
    );
    const svg = el.shadowRoot?.querySelector("svg") as SVGElement;
    expect(getComputedStyle(svg).stroke).to.equal("rgb(180, 40, 40)");
  });
});
