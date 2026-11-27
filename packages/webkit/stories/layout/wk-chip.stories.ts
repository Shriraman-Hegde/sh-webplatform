import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-chip/index.js";
import { attr, componentDocs } from "../_helpers.js";

const meta: Meta = {
  title: "Layout/Chip",
  component: "wk-chip",
  tags: ["autodocs"],
  parameters: componentDocs(
    "Compact label. `removable` fires `wk-remove`; the app removes the chip. Style it with `wk-chip::part(chip)`.",
  ),
  argTypes: {
    label: attr("Chip text.", { defaultValue: "Draft" }),
    variant: attr("Visual style.", {
      control: "select",
      options: ["neutral", "accent"],
      defaultValue: "neutral",
      type: '"neutral" | "accent"',
    }),
    removable: attr("Shows a remove button.", {
      control: "boolean",
      defaultValue: "false",
      type: "boolean",
    }),
  },
  args: { label: "Draft", variant: "neutral", removable: false },
  render: (args) => html`
    <wk-chip variant=${args.variant} ?removable=${args.removable}>${args.label}</wk-chip>
  `,
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {};

export const Removable: Story = {
  args: { variant: "accent", removable: true, label: "Filter" },
};
