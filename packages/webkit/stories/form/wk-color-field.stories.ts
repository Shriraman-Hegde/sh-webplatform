import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/form/wk-color-field/index.js";
import { attr, componentDocs } from "../_helpers.js";

const meta: Meta = {
  title: "Form/Color Field",
  component: "wk-color-field",
  tags: ["autodocs"],
  parameters: componentDocs(
    "Color value with a picker and a text field.",
  ),
  argTypes: {
    label: attr("Field label"),
    name: attr("Form name"),
    value: attr("CSS color"),
    hint: attr("Helper text"),
    message: attr("Error or status text"),
    disabled: attr("Disables the field", {
      control: "boolean",
      defaultValue: "false",
      type: "boolean",
    }),
    error: attr("Error state", {
      control: "boolean",
      defaultValue: "false",
      type: "boolean",
    }),
  },
  render: () => html`<wk-color-field label="Accent" value="#0b6e99"></wk-color-field>`,
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {};
