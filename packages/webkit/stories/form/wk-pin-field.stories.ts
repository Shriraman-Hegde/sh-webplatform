import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/form/wk-pin-field/index.js";
import { attr, componentDocs } from "../_helpers.js";

const meta: Meta = {
  title: "Form/Pin Field",
  component: "wk-pin-field",
  tags: ["autodocs"],
  parameters: componentDocs(
    "One box per character. Arrow keys move between boxes. Paste fills the row. wk-change fires when every box is filled.",
  ),
  argTypes: {
    label: attr("Field label"),
    name: attr("Form name. Submitted as one value"),
    value: attr("Entered characters"),
    length: attr("Number of boxes"),
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
  render: () => html`<wk-pin-field label="Code" length="6"></wk-pin-field>`,
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {};
