import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-carousel/index.js";
import { attr, componentDocs } from "../_helpers.js";

const meta: Meta = {
  title: "Layout/Carousel",
  component: "wk-carousel",
  tags: ["autodocs"],
  parameters: componentDocs(
    "One slide at a time. items is { id, title, text? }[].",
  ),
  argTypes: {
    label: attr("Accessible name"),
    items: attr("Property: { id, title, text? }[]", { control: false }),
    index: attr("Visible slide index"),
  },
  render: () => html`<wk-carousel label="Highlights" .items=${[{ id: "one", title: "Opened", text: "Ada filed the request" }, { id: "two", title: "Reviewed", text: "Ready to ship" }]}></wk-carousel>`,
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {};
