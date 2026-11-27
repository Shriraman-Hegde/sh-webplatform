import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { generatedIconNames } from "@sh-webplatform/icons";
import "../../src/components/layout/wk-icon/index.js";
import { docs, overviewPage, row } from "../_helpers.js";

const usage = `
import { iconRegistry } from "@sh-webplatform/icons";
bootstrapWebkit({ icons: iconRegistry });

<wk-icon name="check" label="Done" size="md"></wk-icon>
`.trim();

const meta: Meta = {
  title: "Layout/Icon",
  component: "wk-icon",
  parameters: {
    ...docs(`Named SVG from \`@sh-webplatform/icons\` via host boot.

### Usage
\`\`\`html
${usage}
\`\`\``),
  },
  argTypes: {
    name: { control: "select", options: [...generatedIconNames] },
    label: { control: "text" },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
  args: { name: "check", label: "Success", size: "md" },
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  parameters: { controls: { disable: true } },
  render: () =>
    overviewPage("wk-icon", usage, [
      {
        heading: "Sizes",
        body: row(
          html`<wk-icon name="check" size="sm" label="sm"></wk-icon>`,
          html`<wk-icon name="check" size="md" label="md"></wk-icon>`,
          html`<wk-icon name="check" size="lg" label="lg"></wk-icon>`,
        ),
      },
      {
        heading: "Gallery",
        body: html`<div
          style="display:flex;flex-wrap:wrap;gap:1rem"
        >
          ${generatedIconNames.map(
            (name) => html`
              <div
                style="display:grid;gap:0.35rem;place-items:center;width:4.5rem"
              >
                <wk-icon name=${name} size="lg"></wk-icon>
                <span style="font-size:0.7rem;color:var(--wk-muted)"
                  >${name}</span
                >
              </div>
            `,
          )}
        </div>`,
      },
    ]),
};

export const Playground: Story = {
  name: "Playground (in depth)",
  render: (args) => html`
    <div style="padding:1.5rem">
      <wk-icon name=${args.name} label=${args.label} size=${args.size}></wk-icon>
    </div>
  `,
};
