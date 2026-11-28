import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-steps/index.js";
import { attr, componentDocs } from "../_helpers.js";

const meta: Meta = {
  title: "Layout/Steps",
  component: "wk-steps",
  tags: ["autodocs"],
  parameters: componentDocs(
    "Step indicator. steps is { id, label }[].",
  ),
  argTypes: {
    active: attr("Current step id"),
    steps: attr("Property: { id, label }[]", { control: false }),
  },
  render: () => html`<wk-steps active="review" .steps=${[{ id: "draft", label: "Draft" }, { id: "review", label: "Review" }, { id: "done", label: "Done" }]}></wk-steps>`,
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {};
