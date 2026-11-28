import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-side-nav/index.js";
import { attr, componentDocs } from "../_helpers.js";

const meta: Meta = {
  title: "Layout/Side Nav",
  component: "wk-side-nav",
  tags: ["autodocs"],
  parameters: componentDocs(
    "Vertical navigation. items is { id, label, icon? }[].",
  ),
  argTypes: {
    label: attr("Accessible name"),
    active: attr("Active item id"),
    items: attr("Property: { id, label, icon? }[]", { control: false }),
  },
  render: () => html`<wk-side-nav label="Navigation" active="inbox" .items=${[{ id: "inbox", label: "Inbox", icon: "mail" }, { id: "files", label: "Files", icon: "folder" }]}></wk-side-nav>`,
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {};
