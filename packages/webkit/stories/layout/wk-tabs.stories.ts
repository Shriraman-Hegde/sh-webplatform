import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-tabs/index.js";
import { docs, overviewPage } from "../_helpers.js";

const tabs = [
  { id: "overview", label: "Overview", icon: "info" },
  { id: "activity", label: "Activity", icon: "list" },
  { id: "files", label: "Files" },
];

const usage = `
<wk-tabs
  .tabs=\${[{ id: "overview", label: "Overview", icon: "info" }]}
  active="overview"
  @wk-change=\${...}
>
  <div slot="overview">Panel</div>
</wk-tabs>
`.trim();

const meta: Meta = {
  title: "Layout/Tabs",
  component: "wk-tabs",
  parameters: {
    ...docs(`Tab list + panels. Optional \`icon\` on items. Emits \`wk-change\`.

### Usage
\`\`\`html
${usage}
\`\`\``),
  },
  argTypes: {
    active: { control: "select", options: tabs.map((t) => t.id) },
  },
  args: { active: "overview" },
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  parameters: { controls: { disable: true } },
  render: () =>
    overviewPage("wk-tabs", usage, [
      {
        heading: "With optional icons",
        body: html`
          <wk-tabs .tabs=${tabs} active="overview">
            <div slot="overview">Overview panel content.</div>
            <div slot="activity">Activity panel content.</div>
            <div slot="files">Files panel content.</div>
          </wk-tabs>
        `,
      },
    ]),
};

export const Playground: Story = {
  name: "Playground (in depth)",
  render: (args) => html`
    <div style="padding:1.5rem;max-width:36rem">
      <wk-tabs .tabs=${tabs} active=${args.active}>
        <div slot="overview">Overview panel content.</div>
        <div slot="activity">Activity panel content.</div>
        <div slot="files">Files panel content.</div>
      </wk-tabs>
    </div>
  `,
};
