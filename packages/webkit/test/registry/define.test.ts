import { expect } from "@open-wc/testing";
import { defineElement, isDefined } from "../../src/registry/index.js";

class WkOnce extends HTMLElement {}

describe("defineElement", () => {
  it("registers a tag only once", () => {
    defineElement("wk-once-test", WkOnce);
    expect(isDefined("wk-once-test")).to.equal(true);
    expect(() => defineElement("wk-once-test", WkOnce)).to.not.throw();
    expect(customElements.get("wk-once-test")).to.equal(WkOnce);
  });
});
