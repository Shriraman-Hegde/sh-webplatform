import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-data-table/index.js";

const columns = [
  { key: "id", label: "ID" },
  { key: "type", label: "Type" },
  { key: "owner", label: "Owner" },
];

const rows = [
  { id: "COL-77", type: "Collateral", owner: "Risk" },
  { id: "FAC-1001", type: "Facility", owner: "Credit" },
  { id: "BOR-42", type: "Borrower", owner: "Onboarding" },
];

const meta: Meta = {
  title: "Layout/Data Table",
  component: "wk-data-table",
  argTypes: {
    caption: { control: "text" },
  },
  args: {
    caption: "Demo references",
  },
  render: (args) => html`
    <div style="padding: 1.5rem">
      <wk-data-table
        caption=${args.caption}
        .columns=${columns}
        .rows=${rows}
      ></wk-data-table>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
