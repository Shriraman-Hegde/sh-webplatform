import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-page-shell/index.js";

const meta: Meta = {
  title: "Layout/Page Shell",
  component: "wk-page-shell",
  argTypes: {
    pageTitle: { control: "text", name: "page-title" },
    subtitle: { control: "text" },
  },
  args: {
    pageTitle: "Workbench",
    subtitle: "Synthetic demo page",
  },
  render: (args) => html`
    <wk-page-shell page-title=${args.pageTitle} subtitle=${args.subtitle}>
      <p style="margin:0;color:var(--wk-muted)">Main content slot</p>
    </wk-page-shell>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
