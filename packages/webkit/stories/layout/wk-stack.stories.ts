import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-stack/index.js";
import { attr, componentDocs } from "../_helpers.js";

const meta: Meta = {
  title: "Layout/Stack",
  component: "wk-stack",
  tags: ["autodocs"],
  parameters: componentDocs(
    "Slot layout with a gap. part=stack.",
  ),
  argTypes: {
    orientation: attr("vertical | horizontal"),
    gap: attr("sm | md | lg"),
  },
  render: () => html`<wk-stack orientation="horizontal" gap="md"><span>One</span><span>Two</span></wk-stack>`,
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {};
