import { expect } from "@open-wc/testing";
import { bootstrapWebkit } from "../src/bootstrap.js";
import { getIconLibrary } from "../src/context/index.js";
import { getMotion, getTheme } from "../src/theme/index.js";

describe("bootstrapWebkit", () => {
  it("links theme, optional icons, and motion for the host", () => {
    const result = bootstrapWebkit({
      theme: "warm",
      motion: "off",
      icons: { get: (n) => (n === "x" ? "X" : undefined) },
    });
    expect(result.theme).to.equal("warm");
    expect(result.motion).to.equal("off");
    expect(getTheme()).to.equal("warm");
    expect(getMotion()).to.equal("off");
    expect(getIconLibrary().get("x")).to.equal("X");
  });

  it("boots without icons", () => {
    const result = bootstrapWebkit({ theme: "default", motion: "on" });
    expect(result.theme).to.equal("default");
    expect(result.motion).to.equal("on");
  });
});
