import { describe, expect, it } from "vitest";
import { applyTheme, normalizeTheme } from "./theme.js";

describe("theme", () => {
  it("normalizes unknown themes to finance", () => {
    expect(normalizeTheme("nope")).toBe("finance");
    expect(normalizeTheme(null)).toBe("finance");
  });

  it("applies manufacturing on documentElement", () => {
    const theme = applyTheme("manufacturing");
    expect(theme).toBe("manufacturing");
    expect(document.documentElement.getAttribute("data-theme")).toBe(
      "manufacturing",
    );
  });
});
