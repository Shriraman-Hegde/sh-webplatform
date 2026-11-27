import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/form/wk-switch/index.js";
import { docs, overviewPage, stack } from "../_helpers.js";

const usage = `
<wk-switch label="Email notifications" name="notify"></wk-switch>
<wk-switch label="Enabled" name="on" .checked=\${true}></wk-switch>
`.trim();

const meta: Meta = {
  title: "Form/Switch",
  component: "wk-switch",
  parameters: {
    ...docs(`On/off toggle. Emits \`wk-change\` with \`{ checked }\`.

### Usage
\`\`\`html
${usage}
\`\`\``),
  },
  argTypes: {
    label: { control: "text" },
    name: { control: "text" },
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    label: "Email notifications",
    name: "notify",
    checked: true,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  parameters: { controls: { disable: true } },
  render: () =>
    overviewPage("wk-switch", usage, [
      {
        heading: "States",
        body: stack(
          html`<wk-switch label="Off" name="a"></wk-switch>`,
          html`<wk-switch label="On" name="b" .checked=${true}></wk-switch>`,
          html`<wk-switch label="Disabled" name="c" disabled></wk-switch>`,
        ),
      },
    ]),
};

export const Playground: Story = {
  name: "Playground (in depth)",
  render: (args) => html`
    <div style="padding:1.5rem">
      <wk-switch
        label=${args.label}
        name=${args.name}
        .checked=${args.checked}
        ?disabled=${args.disabled}
      ></wk-switch>
    </div>
  `,
};
