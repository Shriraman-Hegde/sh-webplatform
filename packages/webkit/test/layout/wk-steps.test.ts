import { expect, fixture, html } from "@open-wc/testing";
import "../../src/components/layout/wk-steps/index.js";
import type { WkSteps } from "../../src/components/layout/wk-steps/index.js";

describe("wk-steps", () => {
  it("marks the chosen step as current", async () => {
    const el = await fixture<WkSteps>(html`
      <wk-steps
        active="draft"
        .steps=${[
          { id: "draft", label: "Draft" },
          { id: "review", label: "Review" },
        ]}
      ></wk-steps>
    `);
    const review = [...(el.shadowRoot?.querySelectorAll("button") ?? [])][1] as HTMLButtonElement;
    review.click();
    await el.updateComplete;
    expect(el.active).to.equal("review");
    expect(review.getAttribute("aria-current")).to.equal("step");
  });
});
