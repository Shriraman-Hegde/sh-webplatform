import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-alert/index.js";
import { docs, overviewPage, stack } from "../_helpers.js";

const usage = `
<wk-alert tone="info" heading="Heads up">Review before submit.</wk-alert>
<wk-alert tone="success" show-icon>Saved.</wk-alert>
<wk-alert tone="danger" icon="error" size="sm">Failed.</wk-alert>
`.trim();

const meta: Meta = {
  title: "Layout/Alert",
  component: "wk-alert",
  parameters: {
    ...docs(`Inline alert. Icons off by default (\`show-icon\` or \`icon\`).

### Usage
\`\`\`html
${usage}
\`\`\``),
  },
  argTypes: {
    tone: {
      control: "select",
      options: ["info", "success", "warning", "danger"],
    },
    size: { control: "select", options: ["sm", "md", "lg"] },
    heading: { control: "text" },
    body: { control: "text" },
    showIcon: { control: "boolean" },
    icon: { control: "text" },
  },
  args: {
    tone: "info",
    size: "md",
    heading: "Heads up",
    body: "Review the request before submitting.",
    showIcon: false,
    icon: "",
  },
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  parameters: { controls: { disable: true } },
  render: () =>
    overviewPage("wk-alert", usage, [
      {
        heading: "Tones (no icon)",
        body: stack(
          html`<wk-alert tone="info" heading="Info">Message</wk-alert>`,
          html`<wk-alert tone="success" heading="Success">Saved</wk-alert>`,
          html`<wk-alert tone="warning" heading="Warning">Check</wk-alert>`,
          html`<wk-alert tone="danger" heading="Danger">Failed</wk-alert>`,
        ),
      },
      {
        heading: "Optional icons & size",
        body: stack(
          html`<wk-alert tone="info" show-icon heading="With tone icon"
            >Default icon for tone</wk-alert
          >`,
          html`<wk-alert tone="danger" icon="warn" size="sm"
            >Custom icon, small</wk-alert
          >`,
        ),
      },
    ]),
};

export const Playground: Story = {
  name: "Playground (in depth)",
  render: (args) => html`
    <div style="padding:1.5rem;max-width:32rem">
      <wk-alert
        tone=${args.tone}
        size=${args.size}
        heading=${args.heading}
        icon=${args.icon || undefined}
        ?show-icon=${args.showIcon}
        >${args.body}</wk-alert
      >
    </div>
  `,
};
