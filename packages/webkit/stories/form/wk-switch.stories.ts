import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/form/wk-switch/index.js";

const meta: Meta = {
  title: "Form/Switch",
  component: "wk-switch",
  argTypes: {
    label: { control: "text" },
    name: { control: "text" },
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    label: "Notify me",
    name: "notify",
    checked: false,
    disabled: false,
  },
  render: (args) => html`
    <div style="padding: 1.5rem">
      <wk-switch
        label=${args.label}
        name=${args.name}
        .checked=${args.checked}
        ?disabled=${args.disabled}
      ></wk-switch>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const On: Story = {
  args: { checked: true },
};
