import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/form/wk-radio-group/index.js";

const options = [
  { value: "low", label: "Low" },
  { value: "normal", label: "Normal" },
  { value: "high", label: "High" },
];

const meta: Meta = {
  title: "Form/Radio Group",
  component: "wk-radio-group",
  argTypes: {
    label: { control: "text" },
    name: { control: "text" },
    value: {
      control: "select",
      options: options.map((o) => o.value),
    },
    disabled: { control: "boolean" },
  },
  args: {
    label: "Priority",
    name: "priority",
    value: "normal",
    disabled: false,
  },
  render: (args) => html`
    <div style="padding: 1.5rem">
      <wk-radio-group
        label=${args.label}
        name=${args.name}
        .value=${args.value}
        .options=${options}
        ?disabled=${args.disabled}
      ></wk-radio-group>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
