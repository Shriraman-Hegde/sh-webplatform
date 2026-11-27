import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { generatedIconNames } from "@sh-webplatform/icons";
import "../../src/components/form/wk-button/index.js";
import { docs, overviewPage, row } from "../_helpers.js";

const usage = `
<wk-button variant="primary">Save</wk-button>
<wk-button variant="secondary" size="sm">Cancel</wk-button>
<wk-button variant="ghost" icon="search">Search</wk-button>
<wk-button icon="plus" icon-only></wk-button>
`.trim();

const meta: Meta = {
  title: "Form/Button",
  component: "wk-button",
  parameters: {
    ...docs(`Action button. Variants, sizes, optional icons, and motion.

### Usage
\`\`\`html
${usage}
\`\`\``),
  },
  argTypes: {
    label: { control: "text" },
    variant: { control: "select", options: ["primary", "secondary", "ghost"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
    animated: { control: "boolean" },
    icon: { control: "select", options: ["", ...generatedIconNames] },
    iconPosition: { control: "select", options: ["start", "end"] },
    iconOnly: { control: "boolean" },
  },
  args: {
    label: "Save",
    variant: "primary",
    size: "md",
    disabled: false,
    animated: true,
    icon: "check",
    iconPosition: "start",
    iconOnly: false,
  },
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  parameters: { controls: { disable: true } },
  render: () =>
    overviewPage("wk-button", usage, [
      {
        heading: "Variants",
        body: row(
          html`<wk-button variant="primary">Primary</wk-button>`,
          html`<wk-button variant="secondary">Secondary</wk-button>`,
          html`<wk-button variant="ghost">Ghost</wk-button>`,
        ),
      },
      {
        heading: "Sizes",
        body: row(
          html`<wk-button size="sm">Small</wk-button>`,
          html`<wk-button size="md">Medium</wk-button>`,
          html`<wk-button size="lg">Large</wk-button>`,
        ),
      },
      {
        heading: "Icons",
        body: row(
          html`<wk-button icon="check">With icon</wk-button>`,
          html`<wk-button icon="external-link" icon-position="end"
            >Icon end</wk-button
          >`,
          html`<wk-button icon="search" icon-only></wk-button>`,
        ),
      },
      {
        heading: "States",
        body: row(
          html`<wk-button disabled>Disabled</wk-button>`,
          html`<wk-button ?animated=${false}>No animation</wk-button>`,
        ),
      },
    ]),
};

export const Playground: Story = {
  name: "Playground (in depth)",
  render: (args) => html`
    <div style="padding: 1.5rem">
      <wk-button
        variant=${args.variant}
        size=${args.size}
        ?disabled=${args.disabled}
        ?animated=${args.animated}
        icon=${args.icon || undefined}
        icon-position=${args.iconPosition}
        ?icon-only=${args.iconOnly}
        >${args.label}</wk-button
      >
    </div>
  `,
};
