import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-split/index.js";
import { attr, componentDocs } from "../_helpers.js";

const meta: Meta = {
  title: "Layout/Split",
  component: "wk-split",
  tags: ["autodocs"],
  parameters: componentDocs(
    "Two panes. Slots primary and secondary. position is a percent from 20 to 80.",
  ),
  argTypes: {
    position: attr("Divider percent"),
  },
  render: () => html`<wk-split position="40"><div slot="primary">List</div><div slot="secondary">Detail</div></wk-split>`,
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {};
