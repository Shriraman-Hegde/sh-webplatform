import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/form/wk-radio-group/index.js";
import { attr, componentDocs, disabledArg } from "../_helpers.js";

const options = [
  { value: "low", label: "Low" },
  { value: "normal", label: "Normal" },
  { value: "high", label: "High" },
];


const meta: Meta = {
  title: "Form/Radio Group",
  component: "wk-radio-group",
  tags: ["autodocs"],
  parameters: componentDocs("Exclusive choice group. Emits `wk-change` with `{ value }`."),
  argTypes: {
    label: attr("Group label.", { defaultValue: "" }),
    value: attr("Selected option value.", {
      control: "select",
      options: options.map((o) => o.value),
      defaultValue: "",
    }),
    disabled: disabledArg,
  },
  args: {
    label: "Priority",
    value: "normal",
    disabled: false,
  },
  render: (args) => html`
    <wk-radio-group
      label=${args.label}
      .value=${args.value}
      ?disabled=${args.disabled}
      .options=${options}
    ></wk-radio-group>
  `,
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {};

export const Disabled: Story = {
  args: { disabled: true },
};
