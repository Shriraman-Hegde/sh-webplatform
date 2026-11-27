import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/form/wk-checkbox/index.js";
import { attr, componentDocs, disabledArg } from "../_helpers.js";

const usage = `<wk-checkbox label="Mark as urgent" name="urgent"></wk-checkbox>`;

const meta: Meta = {
  title: "Form/Checkbox",
  component: "wk-checkbox",
  tags: ["autodocs"],
  parameters: componentDocs(
    "Labeled checkbox. Emits `wk-change` with `{ checked }`.",
    usage,
  ),
  argTypes: {
    label: attr("Checkbox label.", { defaultValue: "" }),
    name: attr("Native name attribute.", { defaultValue: "" }),
    checked: attr("Checked state.", {
      control: "boolean",
      defaultValue: "false",
      type: "boolean",
    }),
    disabled: disabledArg,
  },
  args: {
    label: "Mark as urgent",
    name: "urgent",
    checked: false,
    disabled: false,
  },
  render: (args) => html`
    <wk-checkbox
      label=${args.label}
      name=${args.name}
      .checked=${args.checked}
      ?disabled=${args.disabled}
    ></wk-checkbox>
  `,
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {};

export const Checked: Story = {
  args: { checked: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};
