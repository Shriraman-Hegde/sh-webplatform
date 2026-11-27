import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/form/wk-button/index.js";

const meta: Meta = {
  title: "Form/Button",
  component: "wk-button",
  argTypes: {
    label: { control: "text" },
    variant: {
      control: "select",
      options: ["primary", "secondary"],
    },
    disabled: { control: "boolean" },
  },
  args: {
    label: "Save",
    variant: "primary",
    disabled: false,
  },
  render: (args) => html`
    <div style="padding: 1.5rem">
      <wk-button variant=${args.variant} ?disabled=${args.disabled}
        >${args.label}</wk-button
      >
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {};

export const Secondary: Story = {
  args: { label: "Cancel", variant: "secondary" },
};

export const Disabled: Story = {
  args: { disabled: true },
};
