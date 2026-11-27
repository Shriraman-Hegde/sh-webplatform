import { expect } from "@open-wc/testing";
import { applyTheme, normalizeTheme } from "../../src/theme/index.js";

describe("theme", () => {
  it("normalizes unknown themes to default", () => {
    expect(normalizeTheme("nope")).to.equal("default");
    expect(normalizeTheme(null)).to.equal("default");
  });

  it("applies warm on documentElement", () => {
    const theme = applyTheme("warm");
    expect(theme).to.equal("warm");
    expect(document.documentElement.getAttribute("data-theme")).to.equal(
      "warm",
    );
  });
});
