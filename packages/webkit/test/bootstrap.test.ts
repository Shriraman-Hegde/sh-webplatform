import { expect } from "@open-wc/testing";
import { bootstrapWebkit } from "../src/bootstrap.js";
import { getIconLibrary } from "../src/context/index.js";
import { getMode, getMotion, getTheme } from "../src/theme/index.js";

describe("bootstrapWebkit", () => {
  it("links theme, mode, optional icons, and motion for the host", () => {
    const result = bootstrapWebkit({
      theme: "slate",
      mode: "night",
      motion: "off",
      icons: { get: (n) => (n === "x" ? "X" : undefined) },
    });
    expect(result.theme).to.equal("slate");
    expect(result.mode).to.equal("night");
    expect(result.motion).to.equal("off");
    expect(getTheme()).to.equal("slate");
    expect(getMode()).to.equal("night");
    expect(getMotion()).to.equal("off");
    expect(getIconLibrary().get("x")).to.equal("X");
  });

  it("defaults mode to day when omitted", () => {
    const result = bootstrapWebkit({ theme: "default", motion: "on" });
    expect(result.theme).to.equal("default");
    expect(result.mode).to.equal("day");
    expect(result.motion).to.equal("on");
  });
});
