import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/form/wk-combobox/index.js";
import { attr, componentDocs } from "../_helpers.js";

const meta: Meta = {
  title: "Form/Combobox",
  component: "wk-combobox",
  tags: ["autodocs"],
  parameters: componentDocs(
    "Filterable list. Arrow keys move, Enter chooses, Escape closes. placement is bottom or top. hoist paints the list on the top layer.",
  ),
  argTypes: {
    label: attr("Field label"),
    name: attr("Form name"),
    value: attr("Selected value"),
    options: attr("Property: { value, label }[]", { control: false }),
    placement: attr("bottom | top"),
    hoist: attr("Paint the list on the top layer", {
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
  render: () => html`<wk-combobox label="Team" .options=${[{ value: "platform", label: "Platform" }, { value: "design", label: "Design" }]}></wk-combobox>`,
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {};
