import { describe, expect, it } from "vitest";
import { normalizeTheme } from "@sh-webplatform/webkit";

describe("sample-consumer theme bridge", () => {
  it("uses webkit normalizeTheme", () => {
    expect(normalizeTheme("warm")).toBe("warm");
    expect(normalizeTheme("finance")).toBe("default");
  });
});
