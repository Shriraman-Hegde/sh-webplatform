import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/form/wk-checkbox/index.js";
import { docs, overviewPage, stack } from "../_helpers.js";

const usage = `
<wk-checkbox label="Mark as urgent" name="urgent"></wk-checkbox>
<wk-checkbox label="Accepted" name="tos" .checked=\${true}></wk-checkbox>
`.trim();

const meta: Meta = {
  title: "Form/Checkbox",
  component: "wk-checkbox",
  parameters: {
    ...docs(`Labeled checkbox. Emits \`wk-change\` with \`{ checked }\`.

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
    label: "Mark as urgent",
    name: "urgent",
    checked: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  parameters: { controls: { disable: true } },
  render: () =>
    overviewPage("wk-checkbox", usage, [
      {
        heading: "States",
        body: stack(
          html`<wk-checkbox label="Unchecked" name="a"></wk-checkbox>`,
          html`<wk-checkbox
            label="Checked"
            name="b"
            .checked=${true}
          ></wk-checkbox>`,
          html`<wk-checkbox
            label="Disabled"
            name="c"
            disabled
          ></wk-checkbox>`,
        ),
      },
    ]),
};

export const Playground: Story = {
  name: "Playground (in depth)",
  render: (args) => html`
    <div style="padding:1.5rem">
      <wk-checkbox
        label=${args.label}
        name=${args.name}
        .checked=${args.checked}
        ?disabled=${args.disabled}
      ></wk-checkbox>
    </div>
  `,
};
