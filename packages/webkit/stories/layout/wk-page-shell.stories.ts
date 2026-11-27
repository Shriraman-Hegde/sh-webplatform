import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/form/wk-button/index.js";
import "../../src/components/layout/wk-page-shell/index.js";
import { docs, overviewPage } from "../_helpers.js";

const usage = `
<wk-page-shell page-title="Workbench" subtitle="Demo page">
  <wk-button slot="actions" variant="secondary">Action</wk-button>
  <p>Page content</p>
</wk-page-shell>
`.trim();

const meta: Meta = {
  title: "Layout/Page Shell",
  component: "wk-page-shell",
  parameters: {
    ...docs(`Page frame with title, subtitle, actions slot, and content.

### Usage
\`\`\`html
${usage}
\`\`\``),
  },
  argTypes: {
    pageTitle: { control: "text" },
    subtitle: { control: "text" },
  },
  args: {
    pageTitle: "Workbench",
    subtitle: "Synthetic demo page",
  },
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  parameters: { controls: { disable: true } },
  render: () =>
    overviewPage("wk-page-shell", usage, [
      {
        heading: "Shell",
        body: html`
          <wk-page-shell page-title="Workbench" subtitle="Demo page">
            <wk-button slot="actions" variant="secondary">Action</wk-button>
            <p style="margin:0">Page content in the default slot.</p>
          </wk-page-shell>
        `,
      },
    ]),
};

export const Playground: Story = {
  name: "Playground (in depth)",
  render: (args) => html`
    <wk-page-shell page-title=${args.pageTitle} subtitle=${args.subtitle}>
      <wk-button slot="actions" variant="secondary">Action</wk-button>
      <p>Playground content</p>
    </wk-page-shell>
  `,
};
