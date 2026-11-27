import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-card/index.js";
import { docs, overviewPage } from "../_helpers.js";

const usage = `
<wk-card heading="Request details">
  <p>Card body content</p>
</wk-card>
`.trim();

const meta: Meta = {
  title: "Layout/Card",
  component: "wk-card",
  parameters: {
    ...docs(`Surface container with optional heading.

### Usage
\`\`\`html
${usage}
\`\`\``),
  },
  argTypes: { heading: { control: "text" }, body: { control: "text" } },
  args: { heading: "Request details", body: "Card body content goes here." },
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  parameters: { controls: { disable: true } },
  render: () =>
    overviewPage("wk-card", usage, [
      {
        heading: "With heading",
        body: html`<wk-card heading="Request details"
          ><p style="margin:0">Body content</p></wk-card
        >`,
      },
      {
        heading: "Body only",
        body: html`<wk-card><p style="margin:0">Untitled card</p></wk-card>`,
      },
    ]),
};

export const Playground: Story = {
  name: "Playground (in depth)",
  render: (args) => html`
    <div style="padding:1.5rem;max-width:28rem">
      <wk-card heading=${args.heading}>${args.body}</wk-card>
    </div>
  `,
};
