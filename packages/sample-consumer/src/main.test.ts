import { describe, expect, it } from "vitest";
import { normalizeMode, normalizeTheme } from "@sh-webplatform/webkit";

describe("sample-consumer theme bridge", () => {
  it("uses webkit look and mode normalizers", () => {
    expect(normalizeTheme("forest")).toBe("forest");
    expect(normalizeTheme("finance")).toBe("default");
    expect(normalizeMode("night")).toBe("night");
    expect(normalizeMode("nope")).toBe("day");
  });
});
