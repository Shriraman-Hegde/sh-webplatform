import { expect } from "@open-wc/testing";
import { bootstrapWebkit } from "../src/bootstrap.js";
import { getIconLibrary } from "../src/context/index.js";
import { getTheme } from "../src/theme/index.js";

describe("bootstrapWebkit", () => {
  it("links theme tokens and icon library for the host", () => {
    const theme = bootstrapWebkit({
      theme: "warm",
      icons: { get: (n) => (n === "x" ? "X" : undefined) },
    });
    expect(theme).to.equal("warm");
    expect(getTheme()).to.equal("warm");
    expect(getIconLibrary().get("x")).to.equal("X");
  });
});
