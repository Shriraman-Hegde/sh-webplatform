import { describe, expect, it } from "vitest";
import "./wk-button.js";
import type { WkButton } from "./wk-button.js";

describe("wk-button", () => {
  it("renders a native button with a default slot", async () => {
    const el = document.createElement("wk-button") as WkButton;
    el.textContent = "Save";
    document.body.appendChild(el);
    await el.updateComplete;
    const button = el.shadowRoot?.querySelector("button");
    const slot = el.shadowRoot?.querySelector("slot");
    expect(button).toBeTruthy();
    expect(slot).toBeTruthy();
    const assigned = (slot as HTMLSlotElement).assignedNodes({ flatten: true });
    expect(assigned.map((n) => n.textContent?.trim()).join("")).toContain("Save");
    el.remove();
  });
});
