import { expect } from "@open-wc/testing";
import {
  applyMode,
  applyTheme,
  normalizeMode,
  normalizeTheme,
} from "../../src/theme/index.js";

describe("theme", () => {
  it("normalizes unknown themes to default", () => {
    expect(normalizeTheme("nope")).to.equal("default");
    expect(normalizeTheme(null)).to.equal("default");
  });

  it("accepts slate and forest look ids", () => {
    expect(normalizeTheme("slate")).to.equal("slate");
    expect(normalizeTheme("forest")).to.equal("forest");
  });

  it("applies warm on documentElement", () => {
    const theme = applyTheme("warm");
    expect(theme).to.equal("warm");
    expect(document.documentElement.getAttribute("data-theme")).to.equal(
      "warm",
    );
  });
});

describe("mode", () => {
  it("normalizes unknown modes to day", () => {
    expect(normalizeMode("nope")).to.equal("day");
    expect(normalizeMode(null)).to.equal("day");
  });

  it("applies night on documentElement", () => {
    const mode = applyMode("night");
    expect(mode).to.equal("night");
    expect(document.documentElement.getAttribute("data-mode")).to.equal(
      "night",
    );
    expect(document.documentElement.style.colorScheme).to.equal("dark");
  });

  it("applies day color-scheme light", () => {
    applyMode("day");
    expect(document.documentElement.getAttribute("data-mode")).to.equal("day");
    expect(document.documentElement.style.colorScheme).to.equal("light");
  });
});
