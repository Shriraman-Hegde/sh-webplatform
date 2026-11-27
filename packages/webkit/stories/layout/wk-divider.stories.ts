import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-divider/index.js";

const meta: Meta = {
  title: "Layout/Divider",
  component: "wk-divider",
  argTypes: {
    label: { control: "text" },
  },
  args: {
    label: "Details",
  },
  render: (args) => html`
    <div style="padding: 1.5rem">
      <wk-divider label=${args.label || ""}></wk-divider>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Labeled: Story = {};

export const Plain: Story = {
  args: { label: "" },
};
