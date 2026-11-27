import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-tabs/index.js";
import { attr, componentDocs } from "../_helpers.js";

const tabs = [
  { id: "overview", label: "Overview", icon: "info" },
  { id: "activity", label: "Activity", icon: "list" },
  { id: "files", label: "Files" },
];


const meta: Meta = {
  title: "Layout/Tabs",
  component: "wk-tabs",
  tags: ["autodocs"],
  parameters: componentDocs("Tab list + panels. Optional `icon` on items. Emits `wk-change`."),
  argTypes: {
    active: attr("Active tab id.", {
      control: "select",
      options: tabs.map((t) => t.id),
      defaultValue: "overview",
    }),
  },
  args: { active: "overview" },
  render: (args) => html`
    <div style="max-width:36rem">
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

export const Overview: Story = {};

export const WithoutIcons: Story = {
  render: () => html`
    <wk-tabs
      .tabs=${[
        { id: "a", label: "One" },
        { id: "b", label: "Two" },
      ]}
      active="a"
    >
      <div slot="a">One</div>
      <div slot="b">Two</div>
    </wk-tabs>
  `,
};
