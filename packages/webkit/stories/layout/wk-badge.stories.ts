import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-badge/index.js";
import { attr, componentDocs, sizeArg } from "../_helpers.js";

const usage = `<wk-badge>Draft</wk-badge>
<wk-badge tone="accent" icon="edit">Live</wk-badge>`;

const meta: Meta = {
  title: "Layout/Badge",
  component: "wk-badge",
  tags: ["autodocs"],
  parameters: componentDocs(
    "Compact status chip. Optional icon and size.",
    usage,
  ),
  argTypes: {
    label: attr("Badge label (slot).", { defaultValue: "Draft" }),
    tone: attr("Visual tone.", {
      control: "select",
      options: ["neutral", "accent", "success", "danger"],
      defaultValue: "neutral",
      type: '"neutral" | "accent" | "success" | "danger"',
    }),
    size: sizeArg,
    icon: attr("Optional icon name.", { defaultValue: "" }),
  },
  args: { label: "Draft", tone: "neutral", size: "md", icon: "" },
  render: (args) => html`
    <wk-badge
      tone=${args.tone}
      size=${args.size}
      icon=${args.icon || undefined}
      >${args.label}</wk-badge
    >
  `,
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {};

export const Accent: Story = {
  args: { tone: "accent", label: "Live", icon: "edit" },
};

export const Success: Story = {
  args: { tone: "success", label: "Ready", icon: "check" },
};

export const Danger: Story = {
  args: { tone: "danger", label: "Urgent", icon: "warn" },
};
