import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-timeline/index.js";
import { attr, componentDocs } from "../_helpers.js";

const meta: Meta = {
  title: "Layout/Timeline",
  component: "wk-timeline",
  tags: ["autodocs"],
  parameters: componentDocs(
    "Ordered events. items is { id, title, time, detail? }[].",
  ),
  argTypes: {
    items: attr("Property: { id, title, time, detail? }[]", { control: false }),
  },
  render: () => html`<wk-timeline .items=${[{ id: "1", title: "Opened", time: "2026-11-01", detail: "Ada filed the request" }, { id: "2", title: "Reviewed", time: "2026-11-20" }]}></wk-timeline>`,
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {};
