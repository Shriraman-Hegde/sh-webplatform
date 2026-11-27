import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-spinner/index.js";

const meta: Meta = {
  title: "Layout/Spinner",
  component: "wk-spinner",
  argTypes: {
    label: { control: "text" },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
  args: {
    label: "Saving…",
    size: "md",
  },
  render: (args) => html`
    <div style="padding: 1.5rem">
      <wk-spinner label=${args.label} size=${args.size}></wk-spinner>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
