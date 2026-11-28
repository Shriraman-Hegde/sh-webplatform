import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-tree/index.js";
import { attr, componentDocs } from "../_helpers.js";

const meta: Meta = {
  title: "Layout/Tree",
  component: "wk-tree",
  tags: ["autodocs"],
  parameters: componentDocs(
    "Nested tree. nodes is { id, label, children? }[]. expanded is the open ids.",
  ),
  argTypes: {
    nodes: attr("Property: { id, label, children? }[]", { control: false }),
    expanded: attr("Property: string[]", { control: false }),
  },
  render: () => html`<wk-tree label="Folders" .expanded=${["files"]} .nodes=${[{ id: "files", label: "Files", children: [{ id: "brief", label: "Brief" }] }, { id: "notes", label: "Notes" }]}></wk-tree>`,
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {};
