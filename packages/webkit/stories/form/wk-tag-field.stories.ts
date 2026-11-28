import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/form/wk-tag-field/index.js";
import { attr, componentDocs } from "../_helpers.js";

const meta: Meta = {
  title: "Form/Tag Field",
  component: "wk-tag-field",
  tags: ["autodocs"],
  parameters: componentDocs(
    "Tags added with Enter or a comma. Backspace on an empty draft removes the last tag. name submits the tags joined by commas.",
  ),
  argTypes: {
    label: attr("Field label"),
    name: attr("Form name"),
    tags: attr("Property: string[]", { control: false }),
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
  render: () => html`<wk-tag-field label="Labels" .tags=${["Draft", "Platform"]}></wk-tag-field>`,
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {};
