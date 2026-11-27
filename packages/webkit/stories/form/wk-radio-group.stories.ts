import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/form/wk-radio-group/index.js";
import { docs, overviewPage, stack } from "../_helpers.js";

const options = [
  { value: "low", label: "Low" },
  { value: "normal", label: "Normal" },
  { value: "high", label: "High" },
];

const usage = `
<wk-radio-group
  label="Priority"
  name="priority"
  value="normal"
  .options=\${[
    { value: "low", label: "Low" },
    { value: "normal", label: "Normal" },
    { value: "high", label: "High" },
  ]}
></wk-radio-group>
`.trim();

const meta: Meta = {
  title: "Form/Radio Group",
  component: "wk-radio-group",
  parameters: {
    ...docs(`Exclusive choice group. Emits \`wk-change\` with \`{ value }\`.

### Usage
\`\`\`html
${usage}
\`\`\``),
  },
  argTypes: {
    label: { control: "text" },
    value: { control: "select", options: options.map((o) => o.value) },
    disabled: { control: "boolean" },
  },
  args: {
    label: "Priority",
    value: "normal",
    disabled: false,
  },
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  parameters: { controls: { disable: true } },
  render: () =>
    overviewPage("wk-radio-group", usage, [
      {
        heading: "Options",
        body: stack(
          html`<wk-radio-group
            label="Priority"
            .value=${"normal"}
            .options=${options}
          ></wk-radio-group>`,
          html`<wk-radio-group
            label="Disabled"
            disabled
            .value=${"low"}
            .options=${options}
          ></wk-radio-group>`,
        ),
      },
    ]),
};

export const Playground: Story = {
  name: "Playground (in depth)",
  render: (args) => html`
    <div style="padding:1.5rem">
      <wk-radio-group
        label=${args.label}
        .value=${args.value}
        ?disabled=${args.disabled}
        .options=${options}
      ></wk-radio-group>
    </div>
  `,
};
