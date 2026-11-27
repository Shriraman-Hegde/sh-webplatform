import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-spinner/index.js";
import { attr, componentDocs, sizeArg } from "../_helpers.js";


const meta: Meta = {
  title: "Layout/Spinner",
  component: "wk-spinner",
  tags: ["autodocs"],
  parameters: componentDocs("Loading indicator. `animated` respects global motion."),
  argTypes: {
    label: attr("Status label.", { defaultValue: "Loading" }),
    size: sizeArg,
    animated: attr("Spin animation.", {
      control: "boolean",
      defaultValue: "true",
      type: "boolean",
    }),
  },
  args: { label: "Loading…", size: "md", animated: true },
  render: (args) => html`
    <wk-spinner
      label=${args.label}
      size=${args.size}
      ?animated=${args.animated}
    ></wk-spinner>
  `,
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {};

export const Large: Story = {
  args: { size: "lg" },
};

export const Static: Story = {
  args: { animated: false, label: "Static" },
};
