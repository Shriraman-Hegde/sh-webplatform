import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { generatedIconNames } from "@sh-webplatform/icons";
import "../../src/components/form/wk-button/index.js";

const meta: Meta = {
  title: "Form/Button",
  component: "wk-button",
  argTypes: {
    label: { control: "text" },
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost"],
    },
    disabled: { control: "boolean" },
    icon: { control: "select", options: ["", ...generatedIconNames] },
    iconPosition: { control: "select", options: ["start", "end"] },
    iconOnly: { control: "boolean" },
  },
  args: {
    label: "Save",
    variant: "primary",
    disabled: false,
    icon: "check",
    iconPosition: "start",
    iconOnly: false,
  },
  render: (args) => html`
    <div style="padding: 1.5rem">
      <wk-button
        variant=${args.variant}
        ?disabled=${args.disabled}
        icon=${args.icon || undefined}
        icon-position=${args.iconPosition}
        ?icon-only=${args.iconOnly}
        >${args.label}</wk-button
      >
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {};

export const Secondary: Story = {
  args: { label: "Cancel", variant: "secondary", icon: "close" },
};

export const IconOnly: Story = {
  args: { icon: "search", iconOnly: true, label: "Search" },
};

export const Disabled: Story = {
  args: { disabled: true },
};
