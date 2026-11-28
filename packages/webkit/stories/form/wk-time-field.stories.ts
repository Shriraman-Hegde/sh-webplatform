import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/form/wk-time-field/index.js";
import { attr, componentDocs } from "../_helpers.js";

const meta: Meta = {
  title: "Form/Time Field",
  component: "wk-time-field",
  tags: ["autodocs"],
  parameters: componentDocs(
    "Time field.",
  ),
  argTypes: {
    label: attr("Field label"),
    name: attr("Form name"),
    value: attr("HH:MM"),
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
  render: () => html`<wk-time-field label="Start" value="09:00"></wk-time-field>`,
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {};
