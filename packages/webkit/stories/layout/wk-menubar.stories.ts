import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-menubar/index.js";
import { attr, componentDocs } from "../_helpers.js";

const meta: Meta = {
  title: "Layout/Menu Bar",
  component: "wk-menubar",
  tags: ["autodocs"],
  parameters: componentDocs(
    "Menu bar. menus is { id, label, items: { value, label }[] }[]. Arrow keys move the open menu.",
  ),
  argTypes: {
    label: attr("Accessible name"),
    menus: attr("Property: menu definitions", { control: false }),
    open: attr("Open menu id", {
      control: "boolean",
      defaultValue: "false",
      type: "boolean",
    }),
  },
  render: () => html`<wk-menubar label="Menu" .menus=${[{ id: "file", label: "File", items: [{ value: "new", label: "New" }] }, { id: "edit", label: "Edit", items: [{ value: "copy", label: "Copy" }] }]}></wk-menubar>`,
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {};
