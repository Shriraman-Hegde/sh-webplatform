import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-data-table/index.js";
import { docs, overviewPage } from "../_helpers.js";

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

const usage = `
<wk-data-table
  caption="Sample records"
  .columns=\${[{ key: "id", label: "ID" }]}
  .rows=\${[{ id: "ITEM-A" }]}
></wk-data-table>
`.trim();

const meta: Meta = {
  title: "Layout/Data Table",
  component: "wk-data-table",
  parameters: {
    ...docs(`Simple data table from columns + rows.

### Usage
\`\`\`html
${usage}
\`\`\``),
  },
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  parameters: { controls: { disable: true } },
  render: () =>
    overviewPage("wk-data-table", usage, [
      {
        heading: "Sample",
        body: html`<wk-data-table
          caption="Sample records"
          .columns=${columns}
          .rows=${rows}
        ></wk-data-table>`,
      },
    ]),
};

export const Playground: Story = {
  name: "Playground (in depth)",
  render: () => html`
    <div style="padding:1.5rem">
      <wk-data-table
        caption="Sample records"
        .columns=${columns}
        .rows=${rows}
      ></wk-data-table>
    </div>
  `,
};
