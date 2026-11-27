import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/form/wk-select/index.js";
import { docs, overviewPage, stack } from "../_helpers.js";

const options = [
  { value: "alpha", label: "Team Alpha" },
  { value: "beta", label: "Team Beta" },
  { value: "gamma", label: "Team Gamma" },
];

const usage = `
<wk-select
  label="Team"
  name="team"
  value="alpha"
  .options=\${[
    { value: "alpha", label: "Team Alpha" },
    { value: "beta", label: "Team Beta" },
  ]}
></wk-select>
<wk-select label="Owner" leading-icon="user" size="sm"></wk-select>
`.trim();

const meta: Meta = {
  title: "Form/Select",
  component: "wk-select",
  parameters: {
    ...docs(`Labeled select. Emits \`wk-change\`. Optional leading icon; CSS chevron.

### Usage
\`\`\`html
${usage}
\`\`\``),
  },
  argTypes: {
    label: { control: "text" },
    value: { control: "select", options: options.map((o) => o.value) },
    size: { control: "select", options: ["sm", "md", "lg"] },
    leadingIcon: { control: "text" },
    disabled: { control: "boolean" },
  },
  args: {
    label: "Team",
    value: "alpha",
    size: "md",
    leadingIcon: "",
    disabled: false,
  },
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  parameters: { controls: { disable: true } },
  render: () =>
    overviewPage("wk-select", usage, [
      {
        heading: "Options",
        body: stack(
          html`<wk-select
            label="Team"
            .value=${"alpha"}
            .options=${options}
          ></wk-select>`,
          html`<wk-select
            label="Owner"
            leading-icon="user"
            .value=${"beta"}
            .options=${options}
          ></wk-select>`,
          html`<wk-select
            label="Small"
            size="sm"
            .value=${"gamma"}
            .options=${options}
          ></wk-select>`,
          html`<wk-select
            label="Disabled"
            disabled
            .value=${"alpha"}
            .options=${options}
          ></wk-select>`,
        ),
      },
    ]),
};

export const Playground: Story = {
  name: "Playground (in depth)",
  render: (args) => html`
    <div style="padding:1.5rem;max-width:28rem">
      <wk-select
        label=${args.label}
        .value=${args.value}
        size=${args.size}
        leading-icon=${args.leadingIcon || undefined}
        ?disabled=${args.disabled}
        .options=${options}
      ></wk-select>
    </div>
  `,
};
