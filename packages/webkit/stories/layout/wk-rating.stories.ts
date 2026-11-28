import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-rating/index.js";
import { attr, componentDocs } from "../_helpers.js";

const meta: Meta = {
  title: "Layout/Rating",
  component: "wk-rating",
  tags: ["autodocs"],
  parameters: componentDocs(
    "Star rating. Readonly renders the score without changing it.",
  ),
  argTypes: {
    label: attr("Accessible name"),
    value: attr("Selected score"),
    max: attr("Star count. Default 5"),
    readonly: attr("Prevents changes", {
      control: "boolean",
      defaultValue: "false",
      type: "boolean",
    }),
  },
  render: () => html`<wk-rating label="Quality" value="4" max="5"></wk-rating>`,
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {};
