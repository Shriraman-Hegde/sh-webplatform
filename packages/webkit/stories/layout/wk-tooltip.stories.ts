import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/form/wk-button/index.js";
import "../../src/components/layout/wk-tooltip/index.js";
import { docs, overviewPage, row } from "../_helpers.js";

const usage = `
<wk-tooltip content="More about this action" placement="top">
  <wk-button variant="secondary">Hover me</wk-button>
</wk-tooltip>
`.trim();

const meta: Meta = {
  title: "Layout/Tooltip",
  component: "wk-tooltip",
  parameters: {
    ...docs(`Hover/focus tip around a slotted trigger.

### Usage
\`\`\`html
${usage}
\`\`\``),
  },
  argTypes: {
    content: { control: "text" },
    placement: { control: "select", options: ["top", "bottom"] },
  },
  args: { content: "More about this action", placement: "top" },
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  parameters: { controls: { disable: true } },
  render: () =>
    overviewPage("wk-tooltip", usage, [
      {
        heading: "Placement",
        body: row(
          html`<wk-tooltip content="Appears above" placement="top">
            <wk-button variant="secondary">Top</wk-button>
          </wk-tooltip>`,
          html`<wk-tooltip content="Appears below" placement="bottom">
            <wk-button variant="secondary">Bottom</wk-button>
          </wk-tooltip>`,
        ),
      },
    ]),
};

export const Playground: Story = {
  name: "Playground (in depth)",
  render: (args) => html`
    <div style="padding:3rem 1.5rem">
      <wk-tooltip content=${args.content} placement=${args.placement}>
        <wk-button variant="secondary">Hover me</wk-button>
      </wk-tooltip>
    </div>
  `,
};
