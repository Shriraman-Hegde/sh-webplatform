import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-status-banner/index.js";
import { docs, overviewPage, stack } from "../_helpers.js";

const usage = `
<wk-status-banner tone="empty" message="Nothing yet."></wk-status-banner>
<wk-status-banner tone="loading" show-icon animated></wk-status-banner>
<wk-status-banner tone="error" show-icon message="Failed."></wk-status-banner>
`.trim();

const meta: Meta = {
  title: "Layout/Status Banner",
  component: "wk-status-banner",
  parameters: {
    ...docs(`Page-level status. Icons optional via \`show-icon\`.

### Usage
\`\`\`html
${usage}
\`\`\``),
  },
  argTypes: {
    tone: { control: "select", options: ["empty", "loading", "error"] },
    message: { control: "text" },
    size: { control: "select", options: ["sm", "md", "lg"] },
    showIcon: { control: "boolean" },
    animated: { control: "boolean" },
  },
  args: {
    tone: "empty",
    message: "No linked records yet.",
    size: "md",
    showIcon: false,
    animated: true,
  },
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  parameters: { controls: { disable: true } },
  render: () =>
    overviewPage("wk-status-banner", usage, [
      {
        heading: "Tones",
        body: stack(
          html`<wk-status-banner tone="empty"></wk-status-banner>`,
          html`<wk-status-banner tone="loading" show-icon></wk-status-banner>`,
          html`<wk-status-banner
            tone="error"
            show-icon
            message="Could not load."
          ></wk-status-banner>`,
          html`<wk-status-banner
            tone="empty"
            size="sm"
            message="Small banner"
          ></wk-status-banner>`,
        ),
      },
    ]),
};

export const Playground: Story = {
  name: "Playground (in depth)",
  render: (args) => html`
    <div style="padding:1.5rem">
      <wk-status-banner
        tone=${args.tone}
        message=${args.message}
        size=${args.size}
        ?show-icon=${args.showIcon}
        ?animated=${args.animated}
      ></wk-status-banner>
    </div>
  `,
};
