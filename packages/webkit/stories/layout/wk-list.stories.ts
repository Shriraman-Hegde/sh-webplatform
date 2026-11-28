import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-list/index.js";
import { attr, componentDocs } from "../_helpers.js";

const meta: Meta = {
  title: "Layout/List",
  component: "wk-list",
  tags: ["autodocs"],
  parameters: componentDocs(
    "Selectable rows. items is { id, label, detail?, icon? }[].",
  ),
  argTypes: {
    label: attr("Accessible name"),
    items: attr("Property: { id, label, detail?, icon? }[]", { control: false }),
  },
  render: () => html`<wk-list label="Records" .items=${[{ id: "ada", label: "Ada", detail: "Platform" }, { id: "grace", label: "Grace", detail: "Design" }]}></wk-list>`,
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {};
