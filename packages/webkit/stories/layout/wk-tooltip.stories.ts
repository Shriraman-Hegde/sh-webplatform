import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/form/wk-button/index.js";
import "../../src/components/layout/wk-tooltip/index.js";

const meta: Meta = {
  title: "Layout/Tooltip",
  component: "wk-tooltip",
  argTypes: {
    content: { control: "text" },
    placement: {
      control: "select",
      options: ["top", "bottom"],
    },
  },
  args: {
    content: "More about this action",
    placement: "top",
  },
  render: (args) => html`
    <div style="padding: 3rem 1.5rem">
      <wk-tooltip content=${args.content} placement=${args.placement}>
        <wk-button variant="secondary">Hover me</wk-button>
      </wk-tooltip>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Bottom: Story = {
  args: { placement: "bottom", content: "Appears below" },
};
