import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-link/index.js";
import { docs, overviewPage, row } from "../_helpers.js";

const usage = `
<wk-link href="#item-a">ITEM-A</wk-link>
<wk-link href="#docs" icon="external-link" icon-position="end">Docs</wk-link>
<wk-link href="#" disabled>Disabled</wk-link>
`.trim();

const meta: Meta = {
  title: "Layout/Link",
  component: "wk-link",
  parameters: {
    ...docs(`Accessible link. Optional icon and size.

### Usage
\`\`\`html
${usage}
\`\`\``),
  },
  argTypes: {
    label: { control: "text" },
    href: { control: "text" },
    size: { control: "select", options: ["sm", "md", "lg"] },
    icon: { control: "text" },
    iconPosition: { control: "select", options: ["start", "end"] },
    disabled: { control: "boolean" },
  },
  args: {
    label: "Open record",
    href: "#item-a",
    size: "md",
    icon: "",
    iconPosition: "start",
    disabled: false,
  },
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  parameters: { controls: { disable: true } },
  render: () =>
    overviewPage("wk-link", usage, [
      {
        heading: "Options",
        body: row(
          html`<wk-link href="#a">Plain</wk-link>`,
          html`<wk-link href="#b" icon="link">With icon</wk-link>`,
          html`<wk-link href="#c" icon="external-link" icon-position="end"
            >Icon end</wk-link
          >`,
          html`<wk-link href="#d" size="lg">Large</wk-link>`,
          html`<wk-link href="#e" disabled>Disabled</wk-link>`,
        ),
      },
    ]),
};

export const Playground: Story = {
  name: "Playground (in depth)",
  render: (args) => html`
    <div style="padding:1.5rem">
      <wk-link
        href=${args.href}
        size=${args.size}
        icon=${args.icon || undefined}
        icon-position=${args.iconPosition}
        ?disabled=${args.disabled}
        >${args.label}</wk-link
      >
    </div>
  `,
};
