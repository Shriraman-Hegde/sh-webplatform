import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-skeleton/index.js";
import { attr, componentDocs, sizeArg } from "../_helpers.js";

const usage = `<wk-skeleton variant="text" width="80%"></wk-skeleton>
<wk-skeleton variant="rect" height="4rem"></wk-skeleton>`;

const meta: Meta = {
  title: "Layout/Skeleton",
  component: "wk-skeleton",
  tags: ["autodocs"],
  parameters: componentDocs(
    "Loading placeholder. Optional shimmer via `animated`.",
    usage,
  ),
  argTypes: {
    variant: attr("Shape variant.", {
      control: "select",
      options: ["text", "rect", "circle"],
      defaultValue: "text",
      type: '"text" | "rect" | "circle"',
    }),
    size: sizeArg,
    width: attr("CSS width.", { defaultValue: "100%" }),
    height: attr("CSS height override.", { defaultValue: "" }),
    animated: attr("Shimmer animation.", {
      control: "boolean",
      defaultValue: "true",
      type: "boolean",
    }),
  },
  args: {
    variant: "text",
    size: "md",
    width: "100%",
    height: "",
    animated: true,
  },
  render: (args) => html`
    <div style="max-width:20rem">
      <wk-skeleton
        variant=${args.variant}
        size=${args.size}
        width=${args.width}
        height=${args.height || undefined}
        ?animated=${args.animated}
      ></wk-skeleton>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {};

export const Rect: Story = {
  args: { variant: "rect", height: "4rem" },
};

export const Circle: Story = {
  args: { variant: "circle" },
};

export const LoadingCard: Story = {
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="max-width:20rem;display:grid;gap:0.75rem">
      <wk-skeleton variant="circle"></wk-skeleton>
      <wk-skeleton variant="text" width="80%"></wk-skeleton>
      <wk-skeleton variant="text" width="55%"></wk-skeleton>
      <wk-skeleton variant="rect" height="4rem"></wk-skeleton>
    </div>
  `,
};
