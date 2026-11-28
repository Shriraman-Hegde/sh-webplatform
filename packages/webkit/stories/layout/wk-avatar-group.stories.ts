import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-avatar-group/index.js";
import { attr, componentDocs } from "../_helpers.js";

const meta: Meta = {
  title: "Layout/Avatar Group",
  component: "wk-avatar-group",
  tags: ["autodocs"],
  parameters: componentDocs(
    "Overlapping avatars. items is { label, src? }[]. Extra people collapse into a count.",
  ),
  argTypes: {
    items: attr("Property: { label, src? }[]", { control: false }),
    max: attr("Faces to show before the overflow count. Default 3"),
  },
  render: () => html`<wk-avatar-group max="3" .items=${[{ label: "Ada Lovelace" }, { label: "Grace Hopper" }, { label: "Alan Turing" }, { label: "Edsger Dijkstra" }]}></wk-avatar-group>`,
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {};
