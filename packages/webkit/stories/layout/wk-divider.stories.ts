import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-divider/index.js";
import { docs, overviewPage, stack } from "../_helpers.js";

const usage = `
<wk-divider></wk-divider>
<wk-divider label="Flags"></wk-divider>
`.trim();

const meta: Meta = {
  title: "Layout/Divider",
  component: "wk-divider",
  parameters: {
    ...docs(`Horizontal rule with optional label.

### Usage
\`\`\`html
${usage}
\`\`\``),
  },
  argTypes: { label: { control: "text" } },
  args: { label: "Flags" },
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  parameters: { controls: { disable: true } },
  render: () =>
    overviewPage("wk-divider", usage, [
      {
        heading: "Options",
        body: stack(
          html`<wk-divider></wk-divider>`,
          html`<wk-divider label="Flags"></wk-divider>`,
        ),
      },
    ]),
};

export const Playground: Story = {
  name: "Playground (in depth)",
  render: (args) => html`
    <div style="padding:1.5rem">
      <wk-divider label=${args.label}></wk-divider>
    </div>
  `,
};
