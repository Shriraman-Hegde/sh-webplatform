import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-progress/index.js";

const meta: Meta = {
  title: "Layout/Progress",
  component: "wk-progress",
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100, step: 1 } },
    max: { control: "number" },
    label: { control: "text" },
  },
  args: {
    value: 42,
    max: 100,
    label: "Upload",
  },
  render: (args) => html`
    <div style="padding: 1.5rem; max-width: 24rem">
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

export const Default: Story = {};

export const Complete: Story = {
  args: { value: 100, label: "Complete" },
};
