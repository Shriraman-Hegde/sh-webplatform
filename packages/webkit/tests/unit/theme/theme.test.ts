import { describe, expect, it } from "vitest";
import { applyTheme, normalizeTheme } from "../../../src/theme/index.js";

describe("theme", () => {
  it("normalizes unknown themes to default", () => {
    expect(normalizeTheme("nope")).toBe("default");
    expect(normalizeTheme(null)).toBe("default");
  });

  it("applies warm on documentElement", () => {
    const theme = applyTheme("warm");
    expect(theme).toBe("warm");
    expect(document.documentElement.getAttribute("data-theme")).toBe("warm");
  });
});
