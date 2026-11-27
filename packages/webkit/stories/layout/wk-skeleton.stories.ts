import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-skeleton/index.js";
import { docs, overviewPage, stack } from "../_helpers.js";

const usage = `
<wk-skeleton variant="text" width="80%"></wk-skeleton>
<wk-skeleton variant="rect" height="4rem"></wk-skeleton>
<wk-skeleton variant="circle" size="lg"></wk-skeleton>
`.trim();

const meta: Meta = {
  title: "Layout/Skeleton",
  component: "wk-skeleton",
  parameters: {
    ...docs(`Loading placeholder. Optional shimmer via \`animated\`.

### Usage
\`\`\`html
${usage}
\`\`\``),
  },
  argTypes: {
    variant: { control: "select", options: ["text", "rect", "circle"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    width: { control: "text" },
    height: { control: "text" },
    animated: { control: "boolean" },
  },
  args: {
    variant: "text",
    size: "md",
    width: "100%",
    height: "",
    animated: true,
  },
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  parameters: { controls: { disable: true } },
  render: () =>
    overviewPage("wk-skeleton", usage, [
      {
        heading: "Variants",
        body: stack(
          html`<wk-skeleton variant="circle"></wk-skeleton>`,
          html`<wk-skeleton variant="text" width="80%"></wk-skeleton>`,
          html`<wk-skeleton variant="text" width="55%"></wk-skeleton>`,
          html`<wk-skeleton variant="rect" height="4rem"></wk-skeleton>`,
        ),
      },
      {
        heading: "Sizes",
        body: stack(
          html`<wk-skeleton variant="text" size="sm" width="70%"></wk-skeleton>`,
          html`<wk-skeleton variant="text" size="lg" width="70%"></wk-skeleton>`,
        ),
      },
    ]),
};

export const Playground: Story = {
  name: "Playground (in depth)",
  render: (args) => html`
    <div style="padding:1.5rem;max-width:20rem">
      <wk-skeleton
        variant=${args.variant}
        size=${args.size}
        width=${args.width}
        height=${args.height || undefined}
        ?animated=${args.animated}
      ></wk-skeleton>
    </div>
  `,
};
