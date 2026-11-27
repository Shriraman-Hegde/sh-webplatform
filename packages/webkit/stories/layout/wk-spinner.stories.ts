import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-spinner/index.js";
import { docs, overviewPage, row } from "../_helpers.js";

const usage = `
<wk-spinner label="Loading…"></wk-spinner>
<wk-spinner size="lg" animated></wk-spinner>
`.trim();

const meta: Meta = {
  title: "Layout/Spinner",
  component: "wk-spinner",
  parameters: {
    ...docs(`Loading indicator. \`animated\` respects global motion.

### Usage
\`\`\`html
${usage}
\`\`\``),
  },
  argTypes: {
    label: { control: "text" },
    size: { control: "select", options: ["sm", "md", "lg"] },
    animated: { control: "boolean" },
  },
  args: { label: "Loading…", size: "md", animated: true },
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  parameters: { controls: { disable: true } },
  render: () =>
    overviewPage("wk-spinner", usage, [
      {
        heading: "Sizes",
        body: row(
          html`<wk-spinner size="sm" label="sm"></wk-spinner>`,
          html`<wk-spinner size="md" label="md"></wk-spinner>`,
          html`<wk-spinner size="lg" label="lg"></wk-spinner>`,
          html`<wk-spinner ?animated=${false} label="static"></wk-spinner>`,
        ),
      },
    ]),
};

export const Playground: Story = {
  name: "Playground (in depth)",
  render: (args) => html`
    <div style="padding:1.5rem">
      <wk-spinner
        label=${args.label}
        size=${args.size}
        ?animated=${args.animated}
      ></wk-spinner>
    </div>
  `,
};
