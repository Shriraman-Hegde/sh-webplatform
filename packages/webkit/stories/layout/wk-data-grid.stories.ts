import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-data-grid/index.js";
import { attr, componentDocs } from "../_helpers.js";

const meta: Meta = {
  title: "Layout/Data Grid",
  component: "wk-data-grid",
  tags: ["autodocs"],
  parameters: componentDocs(
    "Sortable, filterable table. columns is { key, label, sortable?, filterable?, hidden? }[]. Header clicks emit wk-sort { key, direction }. Filter fields emit wk-filter { key, value, filters }. The column manager emits wk-columns { columns: visible keys in order, hidden }. part=table. Pagination stays on wk-pagination.",
  ),
  argTypes: {
    caption: attr("Table caption"),
    columns: attr("Property: { key, label, sortable?, filterable?, hidden? }[]", { control: false }),
    rows: attr("Property: record[]", { control: false }),
  },
  render: () => html`<wk-data-grid caption="Records" .columns=${[{ key: "name", label: "Name", sortable: true, filterable: true }, { key: "team", label: "Team", sortable: true, filterable: true }, { key: "status", label: "Status", sortable: true }]} .rows=${[{ name: "Ada", team: "Platform", status: "Open" }, { name: "Grace", team: "Design", status: "Closed" }]}></wk-data-grid>`,
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {};
