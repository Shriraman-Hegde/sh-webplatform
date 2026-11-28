import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-segmented/index.js";
import { attr, componentDocs } from "../_helpers.js";

const meta: Meta = {
  title: "Layout/Segmented",
  component: "wk-segmented",
  tags: ["autodocs"],
  parameters: componentDocs(
    "Single-choice button group. options is { value, label }[].",
  ),
  argTypes: {
    label: attr("Accessible name"),
    value: attr("Selected value"),
    options: attr("Property: { value, label }[]", { control: false }),
  },
  render: () => html`<wk-segmented label="View" value="list" .options=${[{ value: "list", label: "List" }, { value: "board", label: "Board" }]}></wk-segmented>`,
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {};
