import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/form/wk-select/index.js";

const options = [
  { value: "alpha", label: "Team Alpha" },
  { value: "beta", label: "Team Beta" },
  { value: "gamma", label: "Team Gamma" },
];

const meta: Meta = {
  title: "Form/Select",
  component: "wk-select",
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
    label: "Team",
    name: "team",
    value: "alpha",
    disabled: false,
  },
  render: (args) => html`
    <div style="padding: 1.5rem; max-width: 28rem">
      <wk-select
        label=${args.label}
        name=${args.name}
        .value=${args.value}
        .options=${options}
        ?disabled=${args.disabled}
      ></wk-select>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
