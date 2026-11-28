import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-top-bar/index.js";
import { attr, componentDocs } from "../_helpers.js";

const meta: Meta = {
  title: "Layout/Top Bar",
  component: "wk-top-bar",
  tags: ["autodocs"],
  parameters: componentDocs(
    "Page bar. Slots: start, default, end. part=bar.",
  ),
  argTypes: {
    title: attr("Bar title"),
  },
  render: () => html`<wk-top-bar title="Records"><span slot="end">Ada</span></wk-top-bar>`,
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {};
