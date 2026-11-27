import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/form/wk-switch/index.js";
import { attr, componentDocs, disabledArg } from "../_helpers.js";

const usage = `<wk-switch label="Email notifications" name="notify"></wk-switch>`;

const meta: Meta = {
  title: "Form/Switch",
  component: "wk-switch",
  tags: ["autodocs"],
  parameters: componentDocs(
    "On/off toggle. Emits `wk-change` with `{ checked }`.",
    usage,
  ),
  argTypes: {
    label: attr("Switch label.", { defaultValue: "" }),
    name: attr("Native name attribute.", { defaultValue: "" }),
    checked: attr("On/off state.", {
      control: "boolean",
      defaultValue: "false",
      type: "boolean",
    }),
    disabled: disabledArg,
  },
  args: {
    label: "Email notifications",
    name: "notify",
    checked: true,
    disabled: false,
  },
  render: (args) => html`
    <wk-switch
      label=${args.label}
      name=${args.name}
      .checked=${args.checked}
      ?disabled=${args.disabled}
    ></wk-switch>
  `,
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {};

export const Off: Story = {
  args: { checked: false },
};

export const Disabled: Story = {
  args: { disabled: true },
};
