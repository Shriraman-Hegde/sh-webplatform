import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-menu/index.js";
import { attr, componentDocs } from "../_helpers.js";

const meta: Meta = {
  title: "Layout/Menu",
  component: "wk-menu",
  tags: ["autodocs"],
  parameters: componentDocs("Action menu. Choosing a button fires wk-select with that button's value."),
  argTypes: {
    label: attr("Trigger label.", { defaultValue: "Actions" }),
  },
  args: { label: "Actions" },
  render: (args) => html`
    <wk-menu label=${args.label}>
      <button type="button" value="edit">Edit</button>
      <button type="button" value="copy">Copy</button>
    </wk-menu>
  `,
};

export default meta;
type Story = StoryObj;
export const Overview: Story = {};
