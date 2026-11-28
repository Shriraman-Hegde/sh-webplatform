import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/form/wk-number-field/index.js";
import { attr, componentDocs } from "../_helpers.js";

const meta: Meta = {
  title: "Form/Number Field",
  component: "wk-number-field",
  tags: ["autodocs"],
  parameters: componentDocs(
    "Number field with step buttons. Values snap to step and clamp to min and max. hint and message match the text field.",
  ),
  argTypes: {
    label: attr("Field label"),
    name: attr("Form name"),
    value: attr("Current number"),
    min: attr("Minimum"),
    max: attr("Maximum"),
    step: attr("Step amount. Typed values snap to it"),
    size: attr("sm | md | lg"),
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
  render: () => html`<wk-number-field label="Quantity" value="2" min="0" max="10"></wk-number-field>`,
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {};
