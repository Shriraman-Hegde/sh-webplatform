import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-breadcrumbs/index.js";
import { docs, overviewPage, stack } from "../_helpers.js";

const usage = `
<wk-breadcrumbs
  .items=\${[
    { label: "Home", href: "#", icon: "home" },
    { label: "Team Alpha", href: "#" },
    { label: "ITEM-A" },
  ]}
></wk-breadcrumbs>
`.trim();

const meta: Meta = {
  title: "Layout/Breadcrumbs",
  component: "wk-breadcrumbs",
  parameters: {
    ...docs(`Nav trail. Last item is current page. Optional \`icon\` per item.

### Usage
\`\`\`html
${usage}
\`\`\``),
  },
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  parameters: { controls: { disable: true } },
  render: () =>
    overviewPage("wk-breadcrumbs", usage, [
      {
        heading: "With icons",
        body: stack(
          html`<wk-breadcrumbs
            .items=${[
              { label: "Home", href: "#", icon: "home" },
              { label: "Team Alpha", href: "#", icon: "user" },
              { label: "ITEM-A" },
            ]}
          ></wk-breadcrumbs>`,
          html`<wk-breadcrumbs
            .items=${[
              { label: "Home", href: "#" },
              { label: "Records", href: "#" },
              { label: "ITEM-B" },
            ]}
          ></wk-breadcrumbs>`,
        ),
      },
    ]),
};

export const Playground: Story = {
  name: "Playground (in depth)",
  render: () => html`
    <div style="padding:1.5rem">
      <wk-breadcrumbs
        .items=${[
          { label: "Home", href: "#", icon: "home" },
          { label: "Team Alpha", href: "#" },
          { label: "Workbench" },
        ]}
      ></wk-breadcrumbs>
    </div>
  `,
};
