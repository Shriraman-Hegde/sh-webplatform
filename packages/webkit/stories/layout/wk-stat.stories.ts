import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-stat/index.js";
import { attr, componentDocs } from "../_helpers.js";

const meta: Meta = {
  title: "Layout/Stat",
  component: "wk-stat",
  tags: ["autodocs"],
  parameters: componentDocs(
    "Single figure with an optional change line. part=stat.",
  ),
  argTypes: {
    label: attr("Stat name"),
    value: attr("Primary figure"),
    change: attr("Secondary change text"),
    trend: attr("up | down | flat"),
  },
  render: () => html`<wk-stat label="Open" value="12" change="+2" trend="up"></wk-stat>`,
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {};
