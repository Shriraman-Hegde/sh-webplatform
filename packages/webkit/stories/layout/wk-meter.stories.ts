import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-meter/index.js";
import { attr, componentDocs } from "../_helpers.js";

const meta: Meta = {
  title: "Layout/Meter",
  component: "wk-meter",
  tags: ["autodocs"],
  parameters: componentDocs(
    "Meter between min and max. low and high pick the tone. part=track.",
  ),
  argTypes: {
    label: attr("Accessible name"),
    value: attr("Current value"),
    min: attr("Minimum"),
    max: attr("Maximum"),
    low: attr("Low threshold"),
    high: attr("High threshold"),
  },
  render: () => html`<wk-meter label="Storage" value="72" min="0" max="100" low="30" high="70"></wk-meter>`,
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {};
