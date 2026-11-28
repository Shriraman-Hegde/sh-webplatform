import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-hover-card/index.js";
import { attr, componentDocs } from "../_helpers.js";

const meta: Meta = {
  title: "Layout/Hover Card",
  component: "wk-hover-card",
  tags: ["autodocs"],
  parameters: componentDocs(
    "Card that opens after a short hover or focus delay. part=trigger and part=card.",
  ),
  argTypes: {
    label: attr("Trigger label"),
    open: attr("Card is open", {
      control: "boolean",
      defaultValue: "false",
      type: "boolean",
    }),
  },
  render: () => html`<wk-hover-card label="Ada">Platform team</wk-hover-card>`,
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {};
