import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-progress/index.js";
import { docs, overviewPage, stack } from "../_helpers.js";

const usage = `
<wk-progress label="Upload" value="42" max="100"></wk-progress>
`.trim();

const meta: Meta = {
  title: "Layout/Progress",
  component: "wk-progress",
  parameters: {
    ...docs(`Labeled progress bar with percent.

### Usage
\`\`\`html
${usage}
\`\`\``),
  },
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100, step: 1 } },
    max: { control: "number" },
    label: { control: "text" },
  },
  args: { value: 42, max: 100, label: "Upload" },
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  parameters: { controls: { disable: true } },
  render: () =>
    overviewPage("wk-progress", usage, [
      {
        heading: "Values",
        body: stack(
          html`<wk-progress label="Start" value="10"></wk-progress>`,
          html`<wk-progress label="Upload" value="42"></wk-progress>`,
          html`<wk-progress label="Complete" value="100"></wk-progress>`,
        ),
      },
    ]),
};

export const Playground: Story = {
  name: "Playground (in depth)",
  render: (args) => html`
    <div style="padding:1.5rem;max-width:24rem">
      <wk-progress
        value=${args.value}
        max=${args.max}
        label=${args.label}
      ></wk-progress>
    </div>
  `,
};
