import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/form/wk-button/index.js";
import "../../src/components/layout/wk-page-shell/index.js";
import { attr, componentDocs } from "../_helpers.js";

const usage = `<wk-page-shell page-title="Workbench" subtitle="Demo page">
  <wk-button slot="actions" variant="secondary">Action</wk-button>
  <p>Page content</p>
</wk-page-shell>`;

const meta: Meta = {
  title: "Layout/Page Shell",
  component: "wk-page-shell",
  tags: ["autodocs"],
  parameters: componentDocs(
    "Page frame with title, subtitle, actions slot, and content.",
    usage,
  ),
  argTypes: {
    pageTitle: attr("Page title.", {
      defaultValue: "Workbench",
    }),
    subtitle: attr("Optional subtitle.", { defaultValue: "" }),
  },
  args: {
    pageTitle: "Workbench",
    subtitle: "Synthetic demo page",
  },
  render: (args) => html`
    <wk-page-shell page-title=${args.pageTitle} subtitle=${args.subtitle}>
      <wk-button slot="actions" variant="secondary">Action</wk-button>
      <p style="margin:0">Page content in the default slot.</p>
    </wk-page-shell>
  `,
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {};
