import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-context-menu/index.js";
import { attr, componentDocs } from "../_helpers.js";

const meta: Meta = {
  title: "Layout/Context Menu",
  component: "wk-context-menu",
  tags: ["autodocs"],
  parameters: componentDocs(
    "Right-click menu for the default slot. items is { value, label }[]. part=menu.",
  ),
  argTypes: {
    items: attr("Property: { value, label }[]", { control: false }),
  },
  render: () => html`<wk-context-menu .items=${[{ value: "edit", label: "Edit" }, { value: "remove", label: "Remove" }]}><p>Right-click this text</p></wk-context-menu>`,
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {};
