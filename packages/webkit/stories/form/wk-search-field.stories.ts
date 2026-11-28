import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/form/wk-search-field/index.js";
import { attr, componentDocs } from "../_helpers.js";

const meta: Meta = {
  title: "Form/Search Field",
  component: "wk-search-field",
  tags: ["autodocs"],
  parameters: componentDocs(
    "Search field. Typing emits wk-input. Submit emits wk-search.",
  ),
  argTypes: {
    label: attr("Accessible name"),
    name: attr("Form name"),
    value: attr("Current query"),
    placeholder: attr("Placeholder"),
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
  render: () => html`<wk-search-field label="Search" placeholder="Find a record"></wk-search-field>`,
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {};
