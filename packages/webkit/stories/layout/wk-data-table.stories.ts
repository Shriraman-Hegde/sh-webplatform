import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-data-table/index.js";
import { attr, componentDocs } from "../_helpers.js";

const columns = [
  { key: "id", label: "ID" },
  { key: "type", label: "Type" },
  { key: "owner", label: "Owner" },
];
const rows = [
  { id: "ITEM-A", type: "Record", owner: "Team Alpha" },
  { id: "ITEM-B", type: "Record", owner: "Team Beta" },
  { id: "ITEM-C", type: "Record", owner: "Team Gamma" },
];


const meta: Meta = {
  title: "Layout/Data Table",
  component: "wk-data-table",
  tags: ["autodocs"],
  parameters: componentDocs("Simple data table from columns + rows."),
  argTypes: {
    caption: attr("Table caption.", { defaultValue: "" }),
  },
  args: { caption: "Sample records" },
  render: (args) => html`
    <wk-data-table
      caption=${args.caption}
      .columns=${columns}
      .rows=${rows}
    ></wk-data-table>
  `,
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {};
