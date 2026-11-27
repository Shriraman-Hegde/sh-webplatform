import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-tabs/index.js";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "activity", label: "Activity" },
  { id: "files", label: "Files" },
];

const meta: Meta = {
  title: "Layout/Tabs",
  component: "wk-tabs",
  argTypes: {
    active: {
      control: "select",
      options: tabs.map((t) => t.id),
    },
  },
  args: {
    active: "overview",
  },
  render: (args) => html`
    <div style="padding: 1.5rem; max-width: 36rem">
      <wk-tabs .tabs=${tabs} active=${args.active}>
        <div slot="overview">Overview panel content.</div>
        <div slot="activity">Activity panel content.</div>
        <div slot="files">Files panel content.</div>
      </wk-tabs>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
