import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-badge/index.js";
import { docs, overviewPage, row } from "../_helpers.js";

const usage = `
<wk-badge>Draft</wk-badge>
<wk-badge tone="accent" icon="edit">Live</wk-badge>
<wk-badge tone="danger" size="sm">Urgent</wk-badge>
`.trim();

const meta: Meta = {
  title: "Layout/Badge",
  component: "wk-badge",
  parameters: {
    ...docs(`Status chip. Optional \`icon\` and \`size\`.

### Usage
\`\`\`html
${usage}
\`\`\``),
  },
  argTypes: {
    label: { control: "text" },
    tone: {
      control: "select",
      options: ["neutral", "accent", "success", "danger"],
    },
    size: { control: "select", options: ["sm", "md", "lg"] },
    icon: { control: "text" },
  },
  args: { label: "Draft", tone: "neutral", size: "md", icon: "" },
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  parameters: { controls: { disable: true } },
  render: () =>
    overviewPage("wk-badge", usage, [
      {
        heading: "Tones",
        body: row(
          html`<wk-badge>Neutral</wk-badge>`,
          html`<wk-badge tone="accent">Accent</wk-badge>`,
          html`<wk-badge tone="success">Success</wk-badge>`,
          html`<wk-badge tone="danger">Danger</wk-badge>`,
        ),
      },
      {
        heading: "Icons & sizes",
        body: row(
          html`<wk-badge icon="check" tone="success">Ready</wk-badge>`,
          html`<wk-badge size="sm">Small</wk-badge>`,
          html`<wk-badge size="lg" tone="accent">Large</wk-badge>`,
        ),
      },
    ]),
};

export const Playground: Story = {
  name: "Playground (in depth)",
  render: (args) => html`
    <div style="padding:1.5rem">
      <wk-badge tone=${args.tone} size=${args.size} icon=${args.icon || undefined}
        >${args.label}</wk-badge
      >
    </div>
  `,
};
