import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/form/wk-slider/index.js";
import { attr, componentDocs } from "../_helpers.js";

const meta: Meta = {
  title: "Form/Slider",
  component: "wk-slider",
  tags: ["autodocs"],
  parameters: componentDocs(
    "Range slider. Emits wk-input while dragging and wk-change when the value settles.",
  ),
  argTypes: {
    label: attr("Field label"),
    name: attr("Form name"),
    value: attr("Current value"),
    min: attr("Minimum"),
    max: attr("Maximum"),
    step: attr("Step amount"),
    size: attr("sm | md | lg"),
    hint: attr("Helper text"),
    message: attr("Error or status text"),
    disabled: attr("Disables the slider", {
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
  render: () => html`<wk-slider label="Volume" value="40" min="0" max="100"></wk-slider>`,
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {};
