import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-divider/index.js";
import { attr, componentDocs } from "../_helpers.js";


const meta: Meta = {
  title: "Layout/Divider",
  component: "wk-divider",
  tags: ["autodocs"],
  parameters: componentDocs("Horizontal rule with optional mid-line label."),
  argTypes: {
    label: attr("Optional label centered on the divider.", { defaultValue: "" }),
  },
  args: { label: "Flags" },
  render: (args) => html`<wk-divider label=${args.label}></wk-divider>`,
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {};

export const Plain: Story = {
  args: { label: "" },
};
