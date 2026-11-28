import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/form/wk-password-field/index.js";
import { attr, componentDocs } from "../_helpers.js";

const meta: Meta = {
  title: "Form/Password Field",
  component: "wk-password-field",
  tags: ["autodocs"],
  parameters: componentDocs(
    "Password field with a reveal toggle. part=control and part=reveal.",
  ),
  argTypes: {
    label: attr("Field label"),
    name: attr("Form name"),
    value: attr("Current value"),
    revealed: attr("Shows the password", {
      control: "boolean",
      defaultValue: "false",
      type: "boolean",
    }),
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
  render: () => html`<wk-password-field label="Password" value="secret"></wk-password-field>`,
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {};
