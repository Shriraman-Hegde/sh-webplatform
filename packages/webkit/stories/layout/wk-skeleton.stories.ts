import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-skeleton/index.js";

const meta: Meta = {
  title: "Layout/Skeleton",
  component: "wk-skeleton",
  argTypes: {
    variant: {
      control: "select",
      options: ["text", "rect", "circle"],
    },
    width: { control: "text" },
    height: { control: "text" },
  },
  args: {
    variant: "text",
    width: "100%",
    height: "",
  },
  render: (args) => html`
    <div style="padding: 1.5rem; max-width: 20rem; display: grid; gap: 0.75rem">
      <wk-skeleton
        variant=${args.variant}
        width=${args.width}
        height=${args.height || undefined}
      ></wk-skeleton>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const LoadingCard: Story = {
  render: () => html`
    <div style="padding: 1.5rem; max-width: 20rem; display: grid; gap: 0.75rem">
      <wk-skeleton variant="circle" width="2.5rem"></wk-skeleton>
      <wk-skeleton variant="text" width="80%"></wk-skeleton>
      <wk-skeleton variant="text" width="55%"></wk-skeleton>
      <wk-skeleton variant="rect" height="5rem"></wk-skeleton>
    </div>
  `,
};
