import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-progress/index.js";
import { attr, componentDocs } from "../_helpers.js";

const usage = `<wk-progress label="Upload" value="42" max="100"></wk-progress>`;

const meta: Meta = {
  title: "Layout/Progress",
  component: "wk-progress",
  tags: ["autodocs"],
  parameters: componentDocs(
    "Labeled progress bar with percent readout.",
    usage,
  ),
  argTypes: {
    value: attr("Current progress value.", {
      control: { type: "range", min: 0, max: 100, step: 1 },
      defaultValue: "0",
      type: "number",
    }),
    max: attr("Maximum value.", {
      control: "number",
      defaultValue: "100",
      type: "number",
    }),
    label: attr("Accessible / visible label.", { defaultValue: "" }),
  },
  args: { value: 42, max: 100, label: "Upload" },
  render: (args) => html`
    <div style="max-width:24rem">
      <wk-progress
        value=${args.value}
        max=${args.max}
        label=${args.label}
      ></wk-progress>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {};

export const Complete: Story = {
  args: { value: 100, label: "Complete" },
};
