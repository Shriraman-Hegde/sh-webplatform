import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-avatar/index.js";
import { attr, componentDocs, sizeArg } from "../_helpers.js";

const meta: Meta = {
  title: "Layout/Avatar",
  component: "wk-avatar",
  tags: ["autodocs"],
  parameters: componentDocs("Person mark. Shows initials from the label until an image src is set."),
  argTypes: {
    label: attr("Name used for the accessible label and initials.", {
      defaultValue: "Ada Lovelace",
    }),
    src: attr("Image URL. Empty shows initials.", { defaultValue: "" }),
    size: sizeArg,
  },
  args: { label: "Ada Lovelace", src: "", size: "md" },
  render: (args) => html`
    <wk-avatar label=${args.label} src=${args.src} size=${args.size}></wk-avatar>
  `,
};

export default meta;
type Story = StoryObj;
export const Overview: Story = {};
export const Large: Story = { args: { size: "lg", label: "Grace Hopper" } };
