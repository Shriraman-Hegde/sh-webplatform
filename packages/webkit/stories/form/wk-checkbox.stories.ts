import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/form/wk-checkbox/index.js";

const meta: Meta = {
  title: "Form/Checkbox",
  component: "wk-checkbox",
  argTypes: {
    label: { control: "text" },
    name: { control: "text" },
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    label: "Mark as urgent",
    name: "urgent",
    checked: false,
    disabled: false,
  },
  render: (args) => html`
    <div style="padding: 1.5rem">
      <wk-checkbox
        label=${args.label}
        name=${args.name}
        .checked=${args.checked}
        ?disabled=${args.disabled}
      ></wk-checkbox>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Checked: Story = {
  args: { checked: true },
};
